import { NextResponse } from "next/server";
import { MediaService } from "@my-own-blog/core/service/MediaService";

export type Quality = "HIGH" | "MID" | "LOW";
/**
 * @param {number} id 미디어의 id입니다.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: number; quality: Quality } }
) {
  try {
    const t1 = new Date().getMilliseconds();
    const fs = await MediaService.getMedia(params.id, params.quality);
    const t2 = new Date().getMilliseconds();
    const responseHeader = new Headers(request.headers);
    responseHeader.set("Content-Type", "image/webp");
    const data = new ReadableStream({
      start(controller) {
        fs.on("data", (chunk: Buffer) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        fs.on("end", () => {
          console.log(t2-t1, new Date().getMilliseconds() - t1);
          controller.close();
        });
        fs.on("error", (error: NodeJS.ErrnoException) =>
          controller.error(error)
        );
      },
      cancel() {
        fs.destroy();
      },
    });
    return new NextResponse(data, { headers: responseHeader });
  } catch (e) {
    if ((e as Error).message == "File not found")
      return NextResponse.json("", { status: 404 });
    else return NextResponse.json((e as Error).message, {status: 500})
  }
}
