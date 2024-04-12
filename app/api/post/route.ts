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
  console.log("api called");
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
