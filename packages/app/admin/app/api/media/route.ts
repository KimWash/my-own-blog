import { Client } from "minio";
import { NextResponse } from "next/server";
import "@my-own-blog/core/lib/date/date.extensions";
import db from "@my-own-blog/db";

function dmsToDecimal(...[degrees, minutes, seconds]: number[]){
  return degrees + minutes / 60 + seconds / 3600
}

export async function POST(request: Request) {
  const params = new URL(request.url).searchParams;
  const fileName = params.get("filename");
  const postId = params.get("postId");
  const body = await request.json()
  const exif = body.exif ? {} : {
    model: body.exif.Model,
    dateTime: body.exif.DateTime,
    gps: {lat: dmsToDecimal(...(body.exif.GPSLatitude as number[])), long: dmsToDecimal(...(body.exif.GPSLongitude as number[]))}
  }
  console.log(exif)
  
  if (!fileName) return new NextResponse("no filename", { status: 400 });
  // Todo: 인증 로직 추가 후 인증 된 경우에만 업로드 가능하게

  const minioClient = new Client({
    endPoint: process.env.MINIO_URL,
    port: 443,
    useSSL: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_PRIVATE_KEY,
  });
  // 기존 filename 무시. UUID로 생성.
  const fileId = crypto.randomUUID();
  const exactFileName = new Date().format("yyyy-MM-dd") + "/" + fileId;
  const fileType = fileName.match(new RegExp("/*.png|jpg|jpeg|gif|heif|HEIF|HEIC|webp/g"))
    ? "IMAGE"
    : "VIDEO";
  // Todo: Media 생성 
  const media = await db.media.create({
    data: {
      type: fileType,
      create_dt: new Date(),
      name: exactFileName,
      postId: postId && !isNaN(parseInt(postId)) ? parseInt(postId) : null,
      files: {
        create: {
          id: fileId,
          name: exactFileName,
          create_dt: new Date(),
          type: fileName.match(new RegExp("/*.png|jpg|jpeg|gif|heif|HEIF|HEIC|webp/g"))
            ? "IMAGE"
            : "VIDEO",
          quality: "HIGH",
        },
      },
    },
    include: {
      files: true
    }
  });

  return NextResponse.json({
    preSignedUrl: await minioClient.presignedPutObject(
      "my-own-blog",
      exactFileName,
      5 * 60
    ),
    file: media.files[0],
  });
}
