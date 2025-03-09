import { NextResponse } from "next/server";
import { MediaService } from "@my-own-blog/core/service/MediaService";
import { Client } from "minio";
import sharp from "sharp";
import db from "@my-own-blog/db";

var minioClient = new Client({
  endPoint: process.env.MINIO_URL,
  port: 443,
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_PRIVATE_KEY,
});

// 객체 가져오기 및 변환
async function getObjectAsBuffer(
  bucketName: string,
  objectName: string
): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    let chunks: Uint8Array[] = [];

    try {
      const stream = await minioClient.getObject(bucketName, objectName);
      stream.on("data", (chunk: Buffer) => {
        chunks.push(new Uint8Array(chunk));
      });

      stream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });

      stream.on("error", (err: NodeJS.ErrnoException) => {
        reject(err);
      });
    } catch (e) {
      return reject(e);
    }
  });
}

/**
 * @param {number} id 미디어의 id입니다.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV == 'production') return NextResponse.json("Migration not allowed on production.", { status: 403 });
  try {
    const medias = await MediaService.getMedias("HIGH");
    for (const media of medias) {
      const file = media?.files.find((file) => file.quality === "HIGH");
      if (!file) throw new Error("File not found");

      try {

        const buffer = await getObjectAsBuffer("my-own-blog", file.name ?? "");
        const metadata = await sharp(buffer).metadata(); // 👈 sharp로 크기 분석
        console.log(metadata);
        await db.media.update({ where: { id: media.id }, data: {width: metadata.width, height: metadata.height} });
      }catch(e) {
        console.error(`no file. skip. ${media.id} -> ${file.id}`)
      }
    }
    return NextResponse.json('Done!');
  } catch (e) {
    // if ((e as Error).message == "File not found")
    console.error(e)
      return NextResponse.json("", { status: 500 });
  }
}
