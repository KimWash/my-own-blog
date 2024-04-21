"use client";

import MarkdownEditor from "@/components/MarkdownEditor";
import { useRef, useState } from "react";

export default function PostCreateContainer({
  initialMarkdown,
}: {
  initialMarkdown?: string;
}) {
  const [markdown, setMarkdown] = useState(initialMarkdown ?? "");
  return (
    <>
      <button onClick={() => console.log(markdown)}></button>
      {
        // <MarkdownEditor
        //     ref={editorRef}
        //     markdown={initialMarkdown ?? ''}
        //     onChange={setMarkdown}
        // onDrop={(e) => {
        //   e.preventDefault();
        //   const file = e.dataTransfer.files?.[0];
        //   if (file) {
        //   }
        // }}
        // />
        <MarkdownEditor  initialMarkdown={markdown} />
      }
    </>
  );
}
