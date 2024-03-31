import { Post, Tag } from "@prisma/client";

export type PostDetail = Post & { content: string };
export type PostBannerDto = Post & { thumbnailUrl?: string; tags: Tag[]};
