import { Block, BlockNoteSchema, defaultBlockSpecs, PartialBlock } from "@blocknote/core";
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

export type BlogBlock = Block<
  typeof blogSchema.blockSchema,
  typeof blogSchema.inlineContentSchema,
  typeof blogSchema.styleSchema
>;

export type BlogPartialBlock = PartialBlock<
  typeof blogSchema.blockSchema,
  typeof blogSchema.inlineContentSchema,
  typeof blogSchema.styleSchema
>;
