"use server";

import db, { Post } from "@my-own-blog/db";

export type UploadPostDto = Pick<
  Post,
  "title" | "content" | "thumbnail_media"
> & {
  mediaIds: number[];
};
export async function createPost(post: UploadPostDto) {
  console.log(post);
  // Todo:미디어/태그와 포스트 연결하기
  const createdPost = await db.post.create({
    data: {
      title: post.title,
      content: post.content,
      is_deleted: false,
      create_dt: new Date(),
    },
  });
  await db.media.updateMany({
    where: {
      id:{
        in:  post.mediaIds
      }
    },
    data: {
      postId: createdPost.id
    }
  })
  return JSON.stringify(createdPost);
}
