import React, { MutableRefObject, useEffect } from "react";
// editor
import { Editor, EditorProps } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css"; // Editor's Style
// table
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
import colorSyntax, {
  PluginOptions,
} from "@toast-ui/editor-plugin-color-syntax";
// Korean lang
import "@toast-ui/editor/dist/i18n/ko-kr";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Slice, Node } from "prosemirror-model";
/**
 * Slice 객체에서 모든 텍스트를 추출하는 함수
 * @param {Slice} slice - ProseMirror의 Slice 객체
 * @return {string} - 추출된 텍스트
 */
function extractTextFromSlice(slice: Slice) {
  let text = "";

  // Slice의 content는 Fragment 타입
  const fragment = slice.content;

  // Fragment의 각 노드를 순회하면서 텍스트 추출
  fragment.forEach((node: Node) => {
    text += node.textContent; // 각 노드의 텍스트 콘텐츠 추가
  });

  return text;
}

export interface TuiWithForwardedRefProps extends EditorProps {
  // using type ForwardedRef instead of MutableRefObject causes error when using useRef();
  forwardedRef?: MutableRefObject<Editor>;
  // type for color syntax - array of color strings
  colorSyntaxOptions?: PluginOptions;
}
const replaceRange = (org: string, toAdd: string, from: number, to: number) => {
  return org.slice(0, from) + toAdd + org.slice(to, org.length);
};

const TuiWithForwardedRef: React.FC<TuiWithForwardedRefProps> = (props) => {
  useEffect(() => {
    console.log(props.forwardedRef);
    const editor = props.forwardedRef?.current.getInstance();
    editor?.addCommand(
      "markdown",
      "addLatex",
      (
        payload: any,
        state: EditorState,
        dispatch: () => void,
        view: EditorView
      ) => {
        // const markdown: string = editor?.getMarkdown();
        // const [selectionFrom, selectionTo] = [
        //   editor?.posToIndex(state.selection.$anchor.pos),
        //   editor?.posToIndex(state.selection.$head.pos),
        // ];
        console.log(editor?.insertText)
        editor?.insertText(
          `$$latex\n${extractTextFromSlice(state.selection.content())}\n$$`
        );
      }
    );
    editor?.insertToolbarItem(
      { groupIndex: 3, itemIndex: 3 },
      {
        name: "myItem",
        tooltip: "수식 삽입",
        command: "addLatex",
        text: "",
        className: "toastui-editor-toolbar-icons",
        style: {
          background: "url(/function.jpg) no-repeat center center / cover",
        },
      }
    );
  }, [props.forwardedRef]);
  return (
    <Editor
      {...props}
      ref={props.forwardedRef}
      usageStatistics={false}
      plugins={[
        [codeSyntaxHighlight, { highlighter: Prism }],
        [colorSyntax, props.colorSyntaxOptions],
      ]}
    />
  );
};
export default TuiWithForwardedRef;
