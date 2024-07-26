import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { PostDetailDto, PostListDto } from "@my-own-blog/core/lib/model/Post";
import { BlogType } from "../queries/usePostListQuery";

export class PostService {
  static async fetchPosts(page: number, type: BlogType, query?: string) {
    const queryBuilder = new URLSearchParams();
    queryBuilder.append("page", page.toString());
    if (query) queryBuilder.append("query", query);
    queryBuilder.append("type", type ?? "all");
    return (
      await fetchExtended<PostListDto[]>("/api/post?" + queryBuilder.toString())
    ).body;
  }
  static async fetchPost(id: number) {
    return (await fetchExtended<PostDetailDto>("/api/post/" + id)).body;
  }
}
