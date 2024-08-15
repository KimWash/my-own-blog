import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { PostDetailDto, PostListDto } from "@my-own-blog/core/lib/model/Post";
import { BlogType } from "../queries/usePostListQuery";

export class PostService {
  static async fetchPosts(page: number, type: BlogType, params?: {query?: string, category?: string}) {
    const queryBuilder = new URLSearchParams();
    queryBuilder.append("page", page.toString());
    if (params?.query) queryBuilder.append("query", params.query);
    queryBuilder.append("type", type ?? "all");
    return (
      await fetchExtended<PostListDto[]>("/api/post?" + queryBuilder.toString())
    ).body;
  }
  static async fetchPost(id: number) {
    return (await fetchExtended<PostDetailDto>("/api/post/" + id)).body;
  }
}
