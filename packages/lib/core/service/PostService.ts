import { PostDetailDto } from "../lib/model/Post";
import db from "@my-own-blog/db";

export class PostService {
  static async getPost(id: number): Promise<PostDetailDto>{
    const post = await db.post.findFirst({
      where: { id: Number(id), is_deleted: undefined },
      include: {
        tags: { include: { tag: true } },
        medias: { include: { files: true } },
      },
    });
    if (!post) throw new Error('Post not found')
    const medias = post?.medias ?? [];
    const tags = post?.tags.map((postTag) => postTag.tag) ?? [];
    
    return {...post, medias, tags };
  }
}
