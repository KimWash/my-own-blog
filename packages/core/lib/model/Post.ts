import { File, Media, Post, Tag } from "@prisma/client";

export type PostDetailDto = Post & {
  medias: (Media & { files: File[] })[];
  tags: Tag[];
};

export type PostListDto = Post & { thumbnailUrl?: string; tags: Tag[] };
