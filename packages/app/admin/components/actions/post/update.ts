"use server";

import { PostForm } from "@/components/container/PostEditContainer";
import { TagDto } from "@my-own-blog/core/lib/model/Post";
import db, { Post } from "@my-own-blog/db";

export type UploadPostDto = Pick<
  Post,
  "title" | "content" | "thumbnail_media" | "description"
> & {
  mediaIds: number[];
  tags: TagDto[];
};
export async function updatePost(id: number, post: PostForm) {
  console.log(post);
  // 1. 글 수정
  // 3. 글에 딸린 태그 변경사항 있으면 추가/삭제하기
  // 이 때 내용이 같은 태그(trim 한 텍스트가 같은)는 무시한다.
  //
  const updatedPost = await db.post.update({
    data: {
      title: post.title,
      content: post.content,
      description: post.description,
      update_dt: new Date(),
      thumbnail_media: post.thumbnail_media,
    },
    where: { id },
    include: { tags: { include: { tag: true } } },
  });

  // 2. 글에 딸린 미디어 변경사항 있으면 추가/삭제하기 (이미지의 수정은 고려하지 않는다.)
  await db.media.updateMany({
    where: { postId: id },
    data: { postId: null },
  });

  // 클라이언트에서 넘겨준 미디어 식별자는 존재하는 것이라고 가정.
  await Promise.all(
    post.mediaIds.map((mediaId) =>
      db.media.update({
        where: { id: mediaId },
        data: { postId: id },
      })
    )
  );

  // 존재하는 태그 찾기
  const existingTags = updatedPost.tags.map(postTag => postTag.tag);
  
  // 클라이언트에서 넘어온 태그 이름들 트리밍
  const incomingTagNames = post.tags.map((tag) => tag.name?.trim());

  // 클라이언트에서 받은 태그이름들 중 DB에서 글에 할당된 태그들 중 이름 다른 것 찾기
  const tagsToAdd = incomingTagNames.filter(
    (tagName) =>
      !existingTags.some(
        (existingTag) => existingTag.name?.trim() === tagName
      )
  );

  // DB에서 글에 할당된 태그들 중 클라이언트에서 받은 태그이름과 일치하지 않는 태그가 있는지 확인
  const tagsToRemove = existingTags.filter(
    (existingTag) => !incomingTagNames.includes(existingTag.name?.trim())
  );

  await Promise.all(
    tagsToAdd.map(async (tagName) => {
      let tag = await db.tag.findFirst({ where: { name: tagName } });
      if (!tag) {
        tag = await db.tag.create({
          data: { name: tagName, create_dt: new Date() },
        });
      }

      await db.tagsOnPosts.create({ data: { post_id: id, tag_id: tag.id } });
    })
  );

  await Promise.all(
    tagsToRemove.map((tagOnPost) =>
      db.tagsOnPosts.delete({
        where: { post_id_tag_id: { post_id: id, tag_id: tagOnPost.id } },
      })
    )
  );

  return JSON.stringify(updatedPost);
}
