"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "../lib/blocknote/blocknote-blocks.css";
import "./blocknote-viewer-scope.css";

import { Block } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { blogSchema } from "../lib/blocknote/schema";

export default function BlockNoteViewer({ content }: { content?: unknown }) {
  const blocks = Array.isArray(content) ? (content as Block[]) : [];
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
