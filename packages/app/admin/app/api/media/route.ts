import { Client } from "minio";
import { NextResponse } from "next/server";
import "@core/lib/date/date.extensions";
import db from "@db/prisma";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const fileName = params.get("filename");
  if (!fileName) return new NextResponse("no filename", { status: 400 });
  // Todo: 인증 로직 추가 후 인증 된 경우에만 업로드 가능하게

  const minioClient = new Client({
    endPoint: process.env.MINIO_URL,
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_PRIVATE_KEY,
  });
  const exactFileName = new Date().format("yyyy-MM-dd") + "/" + fileName;

  // Todo: Media 생성
  const file = await db.file.create({
    data: {
      name: exactFileName,
      create_dt: new Date(),
      type: fileName.match(new RegExp("/*.png|jpg|gif|heif|HEIF/g"))
        ? "IMAGE"
        : "VIDEO",
      quality: "HIGH",
      mediaId: 2,
    },
  });

  return NextResponse.json({
    preSignedUrl: await minioClient.presignedPutObject(
      "my-own-blog",
      exactFileName,
      5 * 60
    ),
    file
  });
}
