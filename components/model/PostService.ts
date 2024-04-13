import fetchExtended from "@/lib/fetchExtended";
import { PostDetailDto, PostListDto } from "@/lib/model/Post";

export class PostService {
  static async fetchPosts(page: number) {
    return (await fetchExtended<PostListDto[]>("/api/post?page=" + page)).body;
  }
  static async fetchPost(id: number) {
    return (await fetchExtended<PostDetailDto>("/api/post/" + id)).body;
  }
}
