import { PostListDto } from "@/lib/model/Post";
import db from "db";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await db.post.findMany({
    include: {
      tags: { include: { tag: true } },
      thumbnail: true,
    },
  });
  console.log('api called')
  return NextResponse.json(
    posts.map(
      (post) =>
        ({
          ...post,
          thumbnailUrl: post.thumbnail?.url!,
          tags: post.tags.map((post_tag) => post_tag.tag),
        } as PostListDto)
    )
  );
}
