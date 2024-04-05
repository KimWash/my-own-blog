import db from "db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const post = await db.post.findFirst({ where: { id: Number(params.id) } });
  return NextResponse.json(post);
}
