import { Category } from "@my-own-blog/db";
import { File, Media, Post, Prisma, Tag } from "@prisma/client";
import { Block } from "@blocknote/core";

type NonFunctionKeyNames<T> = Exclude<
  {
    [key in keyof T]: T[key] extends Function ? never : key;
  }[keyof T],
  undefined
>;

type RemoveFunctions<T> = Pick<T, NonFunctionKeyNames<T>>;
type PostDto = Pick<
  Post,
  | "title"
  | "create_dt"
  | "id"
  | "description"
  | "update_dt"
  | "thumbnail_media"
> & {
  category: Category;
  postContent: { content: Prisma.JsonValue } | null;
};

export type BlogBlock = Block;
type MediaDto = RemoveFunctions<Media>;
type FileDto = RemoveFunctions<File>;
export type TagDto = RemoveFunctions<Tag>;

export type PostDetailDto = PostDto & {
  medias: (MediaDto & { files: FileDto[] })[];
  tags: TagDto[];
};

export type PostListDto = PostDto & { thumbnailUrl?: string; tags: TagDto[] };
