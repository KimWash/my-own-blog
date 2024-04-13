import fetchExtended from "@/lib/fetchExtended";
import { PostListDto } from "@/lib/model/Post";

export class PostService {
  static async fetchPosts(page: number) {
    return (await fetchExtended<PostListDto[]>("/api/post?page=" + page)).body;
  }
}
