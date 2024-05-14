import { PostDetailDto } from "@core/lib/model/Post";
import db from "@db/prisma";
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
    },
  });
  const medias = post?.medias;
  const tags = post?.tags.map((postTag) => postTag.tag);
  return NextResponse.json({ ...post, medias, tags });
}
