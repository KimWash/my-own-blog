import { NextResponse } from "next/server";
import { PostService } from "@my-own-blog/core/service/PostService";

export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const postDto = PostService.getPost(params.id);
  return NextResponse.json(postDto);
}
