import { NextResponse } from "next/server";
import { MediaService } from "@my-own-blog/core/service/MediaService";
import db from "@my-own-blog/db";
/**
 * @param {number} id 미디어의 id입니다.
 */
export async function GET(request: Request) {
  try {
    const galleryItems = await db.galleryItem.findMany({
      include: { media: true },
    });
    return new NextResponse(
      JSON.stringify(galleryItems.map((item) => ({ ...item })))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(e, { status: 404 });
  }
}
