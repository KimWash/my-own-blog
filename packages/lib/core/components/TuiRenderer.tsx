// code syntax highlight
import Prism from "prismjs"; // main library for coloring
import "prismjs/themes/prism.css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-css";
import "prismjs/components/prism-sql";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
// 3 below for editor-plugin-color-syntax
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";


import dynamic from "next/dynamic";
import { HtmlGenerator, TuiNode, parse } from "latex.js";
const Viewer = dynamic(() =>
  import("@toast-ui/react-editor").then((module) => module.Viewer)
);

export default function TuiRenderer({ content }: { content: string }) {
  return (
    <Viewer
      plugins={[
        [codeSyntaxHighlight, { highlighter: Prism }],
      ]}
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
      initialValue={content}
    />
  );
}
