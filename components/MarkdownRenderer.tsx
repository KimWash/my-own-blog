import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[gfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter PreTag="div" language={match[1]} style={darcula} showLineNumbers customStyle={{borderRadius: 14}} >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <SyntaxHighlighter PreTag="span" style={darcula} customStyle={{padding:0}} >
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
