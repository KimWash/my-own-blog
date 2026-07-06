"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import "@my-own-blog/core/lib/blocknote/blocknote-blocks.css";
import "./blocknote-scope.css";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Block } from "@blocknote/core";
import { blogSchema } from "@my-own-blog/core/lib/blocknote/schema";
import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { File as FileData } from "@my-own-blog/db";
import { loadImage } from "@/lib/upload/loadImage";

type BlockNoteEditorProps = {
  initialContent?: Block[];
  onChange(blocks: Block[]): void;
  addImage: (file: FileData) => void;
};

export default function BlockNoteEditor({
  initialContent,
  onChange,
  addImage,
}: BlockNoteEditorProps) {
  const editor = useCreateBlockNote({
    schema: blogSchema,
    initialContent:
      initialContent && initialContent.length > 0 ? initialContent : undefined,
    uploadFile: async (file: File) => {
      const exif = await loadImage(file);
      const { body: presignResult } = await fetchExtended<{
        preSignedUrl: string;
        file: FileData;
      }>(`/api/media?filename=${file.name}`, {
        method: "POST",
        body: { exif },
        next: { revalidate: 0 },
      });

      await fetch(presignResult.preSignedUrl, {
        method: "PUT",
        body: file,
      });
      addImage(presignResult.file);
      return `/api/media/${presignResult.file.mediaId}/HIGH`;
    },
  });

  return (
    <div className="bn-editor-scope">
      <BlockNoteView editor={editor} onChange={() => onChange(editor.document)} />
    </div>
  );
}
