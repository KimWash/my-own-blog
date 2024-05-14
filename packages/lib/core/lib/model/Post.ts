import { File, Media, Post, Tag } from "@prisma/client";

type NonFunctionKeyNames<T> = Exclude<{
  [key in keyof T] : T[key] extends Function? never : key;
}[keyof T], undefined>;
 
type RemoveFunctions<T> = Pick<T, NonFunctionKeyNames<T>>;
type PostDto = RemoveFunctions<Post>
type MediaDto = RemoveFunctions<Media>
type FileDto = RemoveFunctions<File>
export type TagDto = RemoveFunctions<Tag>

export type PostDetailDto =PostDto & {
  medias: (MediaDto & { files: FileDto[] })[];
  tags: TagDto[];
};

export type PostListDto = PostDto & { thumbnailUrl?: string; tags: TagDto[] };
