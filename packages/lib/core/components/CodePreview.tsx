"use client";

import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";

export default function CodePreview(props: SyntaxHighlighterProps) {
  return (
    <div className="relative">
      {props.showLineNumbers && (
        <button
          onClick={() => {
            navigator.clipboard.writeText(String(props.children));
            alert("클립보드에 복사되었습니다!");
          }}
          className="absolute bottom-0 right-0 bg-white rounded-lg m-2 p-1 text-sm"
        >
          Copy
        </button>
      )}
      <SyntaxHighlighter {...props}>{props.children}</SyntaxHighlighter>
    </div>
  );
}
