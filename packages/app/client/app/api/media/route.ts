import { NextResponse } from "next/server";
import { MediaService } from "@my-own-blog/core/service/MediaService";

/**
 * @param {number} id 미디어의 id입니다.
 */
export async function GET(
  request: Request,
) {
  try {
    const medias = await MediaService.getMedias('HIGH');
    console.log(JSON.stringify(medias));
    return new NextResponse(JSON.stringify(medias) );
  } catch (e) {
    if ((e as Error).message == "File not found")
      return NextResponse.json("", { status: 404 });
  }
}
