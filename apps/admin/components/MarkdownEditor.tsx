"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import fetchExtended from "@core/lib/fetchExtended";
// import { Editor } from "@toast-ui/react-editor";
import { ForwardedRef, forwardRef } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((module) => module.Editor),
  { ssr: false }
);
const codeSyntaxHighlightPlugin = dynamic(
  () => import("@toast-ui/editor-plugin-code-syntax-highlight")
);
import Prism from "prismjs";
import { HtmlGenerator, parse, TuiNode } from "latex.js";
import { File as FileData, Media } from "@prisma/client";
export default forwardRef(function ToastMarkdownEditor(
  {
    initialMarkdown,
  }: {
    initialMarkdown?: string;
  },
  ref: ForwardedRef<typeof Editor>
) {
  return (
    <Editor
      height="auto"
      ref={ref}
      initialValue={initialMarkdown ?? ""}
      previewStyle="vertical"
      initialEditType="markdown"
      plugins={[[codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
      hideModeSwitch
      customHTMLRenderer={{
        latex(node: TuiNode) {
          const generator = new HtmlGenerator({ hyphenate: false });
          const { body } = parse(node.literal, { generator }).htmlDocument();

          // HTML 파싱해서 렌더된 수식만을 남기고 제거
          const domParser = new DOMParser();
          const dom = domParser.parseFromString(body.innerHTML, "text/html");
          dom.querySelector(".katex-html")?.remove();

          return [
            { type: "openTag", tagName: "div", outerNewLine: true },
            { type: "html", content: dom.querySelector("body")?.innerHTML },
            { type: "closeTag", tagName: "div", outerNewLine: true },
          ];
        },
      }}
      hooks={{
        async addImageBlobHook(
          blob: File,
          callback: (imageUrl: string, altText: string) => void
        ) {
          // Todo: Implement Upload
          try {
            const { body: presignResult } = await fetchExtended<{
              preSignedUrl: string;
              file: FileData;
            }>(`/api/media?filename=${blob.name}`);

            await fetch(presignResult.preSignedUrl, {
              method: "PUT",
              body: blob,
            });
            callback(`/api/media/${presignResult.file.mediaId}/HIGH`, "test");
          } catch (e) {
            console.log(e)
            alert("파일 업로드에 실패했습니다..");
          }
        },
      }}
    />
  );
});
