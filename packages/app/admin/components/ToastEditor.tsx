import React, { MutableRefObject, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorProps, Editor as EditorType } from "@toast-ui/react-editor";
import TuiWithForwardedRef, {
  TuiWithForwardedRefProps,
} from "./TuiWithForwardedRef";
import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { TuiNode, HtmlGenerator, parse } from "latex.js";
import { File as FileData } from "@prisma/client";
import { loadImage } from "@/lib/editor/config";

const Editor = dynamic<TuiWithForwardedRefProps>(
  () => import("./TuiWithForwardedRef"),
  {
    ssr: false,
  }
);
const EditorWithForwardRef = React.forwardRef<
  EditorType | undefined, // object type
  EditorProps // prop type
>((props, ref) => (
  <Editor {...props} forwardedRef={ref as MutableRefObject<EditorType>} />
));
EditorWithForwardRef.displayName = "EditorWithForwardRef"; // throws error if not set
interface ToastUiEditorProps extends EditorProps {
  forwardedRef: MutableRefObject<EditorType | undefined>;
  addImage: (file: FileData) => void;
}
const ToastEditor: React.FC<ToastUiEditorProps> = (props) => {
  return (
    <EditorWithForwardRef
      {...props}
      ref={props.forwardedRef}
      initialEditType={props.initialEditType || "markdown"}
      height={props.height || "calc(100% - 100px)"}
      previewStyle={props.previewStyle || "vertical"}
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["table", "image", "link"],
        ["code", "codeblock"],
        ["scrollSync"],
      ]}
      hideModeSwitch
      customHTMLRenderer={{
        latex(node: TuiNode) {
          const generator = new HtmlGenerator({ hyphenate: false });
          const { body } = parse(node.literal, {
            generator,
          }).htmlDocument();

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
            const exif = await loadImage(blob);

            const { body: presignResult } = await fetchExtended<{
              preSignedUrl: string;
              file: FileData;
            }>(`/api/media?filename=${blob.name}`, {
              method: "POST",
              body: { exif },
              next: { revalidate: 0 },
            });

            await fetch(presignResult.preSignedUrl, {
              method: "PUT",
              body: blob,
            });
            props.addImage(presignResult.file);
            callback(`/api/media/${presignResult.file.mediaId}/HIGH`, "test");
          } catch (e) {
            console.log(e);
            alert("파일 업로드에 실패했습니다..");
          }
        },
      }}
    />
  );
};
export default ToastEditor;
