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
      description: post.description,
      is_deleted: false,
      create_dt: new Date(),
      thumbnail_media: post.thumbnail_media,
      category_id: post.category_id,
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
        post_id: createdPost.id,
      },
    });
    await db.tagsOnPosts.createMany({
      data: tags.map((tag) => ({
        tag_id: tag.id,
        post_id: createdPost.id,
      })),
    });
  }
  // 미디어 업데이트 버그 발견!!
  // 본인 글에 해당 안하는 미디어들도 다 업데이트해버림
  // 아마 미디어 없는 글의 경우 빈거 -> 전체라서 그런듯;;
  if (post.mediaIds.length > 0)
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
