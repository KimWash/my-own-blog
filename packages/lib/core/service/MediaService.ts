import db from '@my-own-blog/db'
import { Client } from "minio";

export type Quality = "HIGH" | "MID" | "LOW"

export class MediaService {
  static async getMedia(id: number, quality: Quality) {
    const media = await db.media.findFirst({
      where: { id: Number(id) },
      include: { files: true },
    });
    const file = media?.files.find((file) => file.quality === quality);
    if (!file) throw new Error("File not found");

    var minioClient = new Client({
      endPoint: process.env.MINIO_URL,
      port: 443,
      useSSL: true,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_PRIVATE_KEY,
    });

    return await minioClient.getObject("my-own-blog", file.name ?? "");
  
  }

  static async getMedias(quality: Quality) {
    const medias = await db.media.findMany({
      include: { files: true },
    });
    return medias;
  }

}