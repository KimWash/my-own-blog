"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "../lib/blocknote/blocknote-blocks.css";
import "./blocknote-viewer-scope.css";

import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { blogSchema } from "../lib/blocknote/schema";

type BlogPartialBlock = PartialBlock<
  typeof blogSchema.blockSchema,
  typeof blogSchema.inlineContentSchema,
  typeof blogSchema.styleSchema
>;

export default function BlockNoteViewer({ content }: { content?: unknown }) {
  const blocks = Array.isArray(content) ? (content as BlogPartialBlock[]) : [];
  const editor = useCreateBlockNote({
    schema: blogSchema,
    initialContent: blocks.length > 0 ? blocks : undefined,
  });

  return (
    <div className="bn-viewer-scope">
      <BlockNoteView editor={editor} editable={false} />
    </div>
  );
}
