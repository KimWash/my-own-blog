import { PostListDto } from "@/lib/model/Post";
import db from "db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = 10;

  const posts = await db.post.findMany({
    include: {
      tags: { include: { tag: true } },
      thumbnail: true,
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
