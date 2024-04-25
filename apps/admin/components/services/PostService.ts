"use server";
import db, { Post } from "@db/prisma";

export type UploadPostDto = Pick<Post, "title" | "content" | "thumbnail_media"> & {
  mediaIds: number[];
};

export class PostService {
  static async create(post: UploadPostDto) {
    db.post.create({
      data: {
        ...post,
        create_dt: new Date(),
      },
    });
  }
}
