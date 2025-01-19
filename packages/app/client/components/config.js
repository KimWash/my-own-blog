import Code from '@calumk/editorjs-codecup';
import ImageTool from '@editorjs/image';
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";

export const EDITOR_TOOLS = {
  code: Code,
  paragraph: { class: Paragraph, inlineToolbar: true },
  header: Header,
  list: List,
  quote: Quote,
  table: Table,
  inlineCode: InlineCode,
  image: {
    class: ImageTool,
    config: {
      features: {
        caption: false
      }
    }
  }
};
