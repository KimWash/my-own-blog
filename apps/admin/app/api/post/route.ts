import { PostListDto } from "@core/lib/model/Post";
import { NextResponse } from "next/server";
import db from "@db/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const keyword = searchParams.get("query");
  const pageSize = 10;

  const posts = await db.post.findMany({
    include: {
      tags: { include: { tag: true } },
      thumbnail: true,
    },
    where: {
      OR: keyword ? [
        {
          title: {
            contains: keyword,
          },
        },
        {
          content: {
            contains: keyword ,
          },
        },
      ] : undefined,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const result = posts.map(
    (post) =>
      ({
        ...post,
        thumbnailUrl: post.thumbnail?.url!,
        tags: post.tags.map((post_tag) => post_tag.tag),
      } as PostListDto)
  );
  return NextResponse.json(result);
}