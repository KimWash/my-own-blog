declare module 'latex.js' {

  type TuiNode = {
    type: "document" | "heading" | "paragraph" | "strong" | "text";
    level: number;
    parent: TuiNode;
    firstChild: TuiNode;
    literal: string;
  };

  interface HtmlGeneratorOptions {
      hyphenate?: boolean;
  }

  class HtmlGenerator {
      constructor(options: HtmlGeneratorOptions);
  }

  interface ParseResult {
      htmlDocument(): {body: {innerHTML: string}};
  }

  function parse(input: string, options: { generator: HtmlGenerator }): ParseResult;
}
