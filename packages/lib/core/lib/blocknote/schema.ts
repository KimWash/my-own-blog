import { BlockNoteSchema, defaultBlockSpecs } from "@blocknote/core";
import { codeBlock } from "./blocks/CodeBlock";
import { mathBlock } from "./blocks/MathBlock";
import { imageGalleryBlock } from "./blocks/ImageGalleryBlock";

export const blogSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    codeBlock,
    math: mathBlock,
    imageGallery: imageGalleryBlock,
  },
});

export type BlogBlock = (typeof blogSchema.blockSchema)[keyof typeof blogSchema.blockSchema];
