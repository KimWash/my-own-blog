import { PostDetailDto } from "@core/lib/model/Post";
import db, { Post } from "@db/prisma";

type NonFunctionKeyNames<T> = Exclude<{
  [key in keyof T] : T[key] extends Function? never : key;
}[keyof T], undefined>;
 
type RemoveFunctions<T> = Pick<T, NonFunctionKeyNames<T>>;

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
