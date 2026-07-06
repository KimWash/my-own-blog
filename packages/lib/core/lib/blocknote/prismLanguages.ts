import Prism from "prismjs";
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

export const CODE_LANGUAGES = [
  "text",
  "python",
  "dart",
  "kotlin",
  "markdown",
  "bash",
  "javascript",
  "typescript",
  "java",
  "c",
  "css",
  "sql",
] as const;

export type CodeLanguage = (typeof CODE_LANGUAGES)[number];

export function highlightCode(code: string, language: string): string {
  const grammar = Prism.languages[language];
  if (!grammar) return code;
  return Prism.highlight(code, grammar, language);
}

export { Prism };
