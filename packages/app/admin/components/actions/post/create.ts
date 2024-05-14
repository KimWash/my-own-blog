'use server';

import db, { Post } from "@db/prisma";

export type UploadPostDto = Pick<
  Post,
  "title" | "content" | "thumbnail_media"
> & {
  mediaIds: number[];
};
export async function createPost(post: UploadPostDto) {
  console.log(post)
  // return await db.post.create({
  //   data: {
  //     title: post.title,
  //     content: post.content,
  //     is_deleted: false,

  //     create_dt: new Date(),
  //   },
  // });
}
