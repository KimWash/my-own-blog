/**
 * 기존 Post.content(EditorJS JSON 또는 레거시 Toast UI 마크다운)를 읽어
 * BlockNote Block[] JSON으로 변환한 뒤 PostContent 테이블에 적재하는 1회성 마이그레이션 스크립트.
 *
 * 실행: yarn db migrate:content [--dry-run] [--overwrite] [--confirm-prod]
 *
 * - Post.content 컬럼은 절대 수정/삭제하지 않는다 (컬럼 드롭은 별도 스키마 마이그레이션에서 진행).
 * - 프로덕션 DB에서 --confirm-prod 없이 실행되는 것을 막는다.
 */
import { PrismaClient, Prisma } from "@prisma/client";
import { ServerBlockNoteEditor } from "@blocknote/server-util";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const shouldOverwrite = args.includes("--overwrite");
const confirmedProd = args.includes("--confirm-prod");

if (process.env.NODE_ENV === "production" && !confirmedProd) {
  console.error(
    "프로덕션 환경으로 보입니다. 의도한 것이 맞다면 --confirm-prod 플래그를 추가해서 다시 실행하세요."
  );
  process.exit(1);
}

const db = new PrismaClient();

// packages/lib/core가 이미 packages/lib/db에 의존하므로 순환 의존을 피하기 위해
// isJSONObject 로직을 그대로 복제한다.
function isJSONObject(value: unknown): boolean {
  try {
    JSON.parse(value as string);
    return true;
  } catch (e) {
    return false;
  }
}

type BnBlock = Record<string, any>;

function makeParagraph(text: string): BnBlock {
  return {
    type: "paragraph",
    props: {},
    content: text ? [{ type: "text", text, styles: {} }] : [],
    children: [],
  };
}

function makeHeading(text: string, level: number): BnBlock {
  return {
    type: "heading",
    props: { level },
    content: text ? [{ type: "text", text, styles: {} }] : [],
    children: [],
  };
}

function makeListItem(type: "bulletListItem" | "numberedListItem", text: string): BnBlock {
  return {
    type,
    props: {},
    content: text ? [{ type: "text", text, styles: {} }] : [],
    children: [],
  };
}

function makeImage(url: string): BnBlock {
  return {
    type: "image",
    props: { url, caption: "", previewWidth: 512 },
    content: undefined,
    children: [],
  };
}

function makeCodeBlock(code: string, language: string): BnBlock {
  return {
    type: "codeBlock",
    props: { language: language || "text", code: code ?? "" },
    content: undefined,
    children: [],
  };
}

function makeMathBlock(code: string): BnBlock {
  return {
    type: "math",
    props: { code: code ?? "" },
    content: undefined,
    children: [],
  };
}

function makeTable(rows: string[][]): BnBlock {
  return {
    type: "table",
    props: {},
    content: {
      type: "tableContent",
      rows: rows.map((row) => ({
        cells: row.map((cell) => (cell ? [{ type: "text", text: cell, styles: {} }] : [])),
      })),
    },
    children: [],
  };
}

/** 지원하지 않는 인라인 HTML 태그를 제거하고 텍스트만 남긴다 (best-effort). */
function stripInlineHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

type EditorJsBlock = { type: string; data: Record<string, any> };
type EditorJsOutput = { blocks: EditorJsBlock[] };

function convertEditorJsBlock(block: EditorJsBlock, warnings: string[]): BnBlock[] {
  switch (block.type) {
    case "paragraph":
      return [makeParagraph(stripInlineHtml(block.data.text ?? ""))];
    case "header":
      return [makeHeading(stripInlineHtml(block.data.text ?? ""), block.data.level ?? 2)];
    case "list": {
      const isOrdered = block.data.style === "ordered";
      const items: string[] = block.data.items ?? [];
      return items.map((item) =>
        makeListItem(isOrdered ? "numberedListItem" : "bulletListItem", stripInlineHtml(item))
      );
    }
    case "quote":
      return [makeParagraph(stripInlineHtml(block.data.text ?? ""))];
    case "table":
      return [makeTable(block.data.content ?? [])];
    case "image":
      return [makeImage(block.data.file?.url ?? block.data.url ?? "")];
    case "code":
      return [makeCodeBlock(block.data.code ?? "", block.data.language ?? "text")];
    default:
      warnings.push(`unrecognized EditorJS block type "${block.type}", skipped`);
      return [];
  }
}

function convertEditorJsContent(raw: string, warnings: string[]): BnBlock[] {
  const output = JSON.parse(raw) as EditorJsOutput;
  return (output.blocks ?? []).flatMap((block) => convertEditorJsBlock(block, warnings));
}

const LATEX_FENCE_REGEX = /```latex\s*\n([\s\S]*?)```/g;

async function convertMarkdownContent(
  markdown: string,
  serverEditor: ServerBlockNoteEditor,
  warnings: string[]
): Promise<BnBlock[]> {
  const latexBlocks: string[] = [];
  const withPlaceholders = markdown.replace(LATEX_FENCE_REGEX, (_match, code) => {
    const index = latexBlocks.length;
    latexBlocks.push(code.trim());
    return `\n\n@@MATH_PLACEHOLDER_${index}@@\n\n`;
  });

  if (latexBlocks.length > 0) {
    warnings.push(`${latexBlocks.length} legacy <latex> block(s) detected, converted to math blocks`);
  }

  const parsedBlocks = (await serverEditor.tryParseMarkdownToBlocks(withPlaceholders)) as BnBlock[];

  return parsedBlocks.flatMap((block) => {
    const text = block.content?.[0]?.text as string | undefined;
    const match = text?.match(/^@@MATH_PLACEHOLDER_(\d+)@@$/);
    if (match) {
      return [makeMathBlock(latexBlocks[Number(match[1])])];
    }
    return [block];
  });
}

async function migrateOne(
  post: { id: number; content: string | null },
  serverEditor: ServerBlockNoteEditor
): Promise<{ id: number; status: "migrated" | "skipped" | "failed"; warnings: string[] }> {
  const warnings: string[] = [];
  try {
    if (!shouldOverwrite) {
      const existing = await db.postContent.findUnique({ where: { post_id: post.id } });
      if (existing) return { id: post.id, status: "skipped", warnings };
    }

    const isJson = isJSONObject(post.content);
    const blocks = isJson
      ? convertEditorJsContent(post.content as string, warnings)
      : await convertMarkdownContent(post.content ?? "", serverEditor, warnings);

    if (!isDryRun) {
      await db.postContent.upsert({
        where: { post_id: post.id },
        create: {
          post_id: post.id,
          content: blocks as unknown as Prisma.InputJsonValue,
          create_dt: new Date(),
        },
        update: {
          content: blocks as unknown as Prisma.InputJsonValue,
          update_dt: new Date(),
        },
      });
    }

    return { id: post.id, status: "migrated", warnings };
  } catch (e) {
    warnings.push((e as Error).message);
    return { id: post.id, status: "failed", warnings };
  }
}

async function main() {
  const serverEditor = ServerBlockNoteEditor.create();

  const BATCH_SIZE = 50;
  let cursor: number | undefined = undefined;
  let succeeded = 0;
  let skipped = 0;
  let failed = 0;

  console.log(`Starting content migration (dryRun=${isDryRun}, overwrite=${shouldOverwrite})`);

  while (true) {
    const posts: { id: number; content: string | null }[] = await db.post.findMany({
      where: { content: { not: null } },
      select: { id: true, content: true },
      orderBy: { id: "asc" },
      take: BATCH_SIZE,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });

    if (posts.length === 0) break;

    for (const post of posts) {
      const result = await migrateOne(post, serverEditor);
      if (result.status === "migrated") succeeded++;
      else if (result.status === "skipped") skipped++;
      else failed++;

      const prefix = result.status === "failed" ? "FAILED" : result.status.toUpperCase();
      console.log(`[${prefix}] post #${post.id}${result.warnings.length ? " - " + result.warnings.join("; ") : ""}`);
    }

    cursor = posts[posts.length - 1].id;
  }

  console.log(`\nDone. succeeded=${succeeded} skipped=${skipped} failed=${failed}`);
  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
