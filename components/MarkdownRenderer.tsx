"use client";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { darcula, dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CodePreview from "./CodePreview";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p(props) {
          return <p>{props.children}</p>;
        },
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          const isCodeBlock = match;
          return isCodeBlock ? (
            <CodePreview
              PreTag="div"
              language={match[1]}
              style={darcula}
              showLineNumbers
              customStyle={{ borderRadius: 14 }}
            >
              {String(children).replace(/\n$/, "")}
            </CodePreview>
          ) : (
            <SyntaxHighlighter PreTag="code" style={darcula} customStyle={{padding: 0}} >
              {String(children)}
            </SyntaxHighlighter>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
