import db from "@/lib/prisma";
import { createReadStream } from "fs";
import { Client } from "minio";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param {number} id 미디어의 id입니다.
 */
export async function GET(
  request: Request,
  { params }: { params: { id: number; quality: "HIGH" | "MID" | "LOW" } }
) {
  const media = await db.media.findFirst({
    where: { id: Number(params.id) },
    include: { files: true },
  });
  const file = media?.files.find((file) => file.quality === params.quality);
  console.log("파일 발견: ", file);
  if (!file) return NextResponse.json("", { status: 404 });

  var minioClient = new Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_PRIVATE_KEY,
  });

  const responseHeader = new Headers(request.headers);
  responseHeader.set("Content-Type", "image/png");
  const fs = await minioClient.getObject("my-own-blog", file.name ?? "");
  const data = new ReadableStream({
    start(controller) {
      fs.on("data", (chunk: Buffer) =>
        controller.enqueue(new Uint8Array(chunk))
      );
      fs.on("end", () => controller.close());
      fs.on("error", (error: NodeJS.ErrnoException) => controller.error(error));
    },
    cancel() {
      fs.destroy();
    },
  });
  return new NextResponse(data, { headers: responseHeader });
}
