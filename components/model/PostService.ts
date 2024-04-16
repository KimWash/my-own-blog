import fetchExtended from "@/lib/fetchExtended";
import { PostDetailDto, PostListDto } from "@/lib/model/Post";

export class PostService {
  static async fetchPosts(page: number, query?: string) {
    const queryBuilder = new URLSearchParams();
    queryBuilder.append("page", page.toString());
    if (query) queryBuilder.append("query", query);
    return (await fetchExtended<PostListDto[]>("/api/post?" + queryBuilder.toString())).body;
  }
  static async fetchPost(id: number) {
    return (await fetchExtended<PostDetailDto>("/api/post/" + id)).body;
  }
}
