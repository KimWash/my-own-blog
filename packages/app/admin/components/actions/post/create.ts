"use server";

import { PostForm } from "@/components/container/PostEditContainer";
import { TagDto } from "@my-own-blog/core/lib/model/Post";
import db, { Post } from "@my-own-blog/db";

export async function createPost(id: number, post: PostForm) {
  console.log(post);
  // Todo:미디어/태그와 포스트 연결하기
  const createdPost = await db.post.create({
    data: {
      title: post.title,
      content: post.content,
      is_deleted: false,
      create_dt: new Date(),
      thumbnail_media: post.thumbnail_media,
    },
  });
  if (post.tags) {
    await db.tag.createMany({
      data: post.tags.map((tag) => ({
        ...tag,
        id: undefined,
        post_id: createdPost.id,
      })),
    });
    const tags = await db.tag.findMany({
      where: {
        post_id: createdPost.id
      }
    });
    await db.tagsOnPosts.createMany({
      data: tags.map((tag) => ({
        tag_id: tag.id,
        post_id: createdPost.id,
      })),
    });
  }
  await db.media.updateMany({
    where: {
      id: {
        in: post.mediaIds,
      },
    },
    data: {
      postId: createdPost.id,
    },
  });
  return JSON.stringify(createdPost);
}
