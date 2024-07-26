import { PostDetailDto } from '@my-own-blog/core/lib/model/Post';
import db from "@my-own-blog/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const post = await db.post.findFirst({
    where: { id: Number(params.id), is_deleted: undefined },
    include: {
      tags: { include: { tag: true } },
      medias: { include: { files: true } },
      category: true
    },
  });
  const medias = post?.medias;
  const tags = post?.tags.map((postTag) => postTag.tag);
  console.log('post category:',post?.category)
  return NextResponse.json({ ...post, medias, tags });
}
