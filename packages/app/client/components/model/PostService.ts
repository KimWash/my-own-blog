import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { PostDetailDto, PostListDto } from "@my-own-blog/core/lib/model/Post";
import { BlogType } from "../queries/usePostListQuery";

export class PostService {
  static async fetchPosts(page: number, type: BlogType, params?: {query?: string, category?: string}) : Promise<PostListDto[]> {
    const queryBuilder = new URLSearchParams();
    queryBuilder.append("page", page.toString());
    queryBuilder.append("type", type ?? "all");

    // 검색조건
    if (params?.query) queryBuilder.append("query", params.query);
    if (params?.category) queryBuilder.append('category', params.category);

    return (
      await fetchExtended<PostListDto[]>("/api/post?" + queryBuilder.toString())
    ).body;
  }
  static async fetchPost(id: number) {
    return (await fetchExtended<PostDetailDto>("/api/post/" + id)).body;
  }
}
