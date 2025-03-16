import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { BlogType, PostQueryKey } from "./usePostListQuery";
import { PostService } from "../model/PostService";
import { PostListDto } from "@my-own-blog/core/lib/model/Post";
import { useTypedInfiniteQuery } from "./useTypedInfiniteQuery";
export interface PostSearchParam {
  type: BlogType;
  query?: string;
  category?: string;
}
export default function useSearchQuery(param: PostSearchParam) {
  return useQuery<PostListDto[]>({
    // getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
    // initialPageParam: param.page,
    queryKey: PostQueryKey.search(param),
    queryFn: async ({ queryKey: [_, page, type, category, query] }) => {
      return await PostService.fetchPosts(Number(page), type as BlogType, {
        query: query?.toString(),
        category: category?.toString(),
      });
    },
  });
  // return useInfiniteQuery<PostListDto[], Error, InfiniteData<PostListDto[]>, ReturnType<typeof PostQueryKey.search>, number>({
  //   getNextPageParam: (lastPage, allPages, lastPageParam) => lastPageParam + 1,
  //   initialPageParam: param.page,
  //   queryKey: PostQueryKey.search(param),
  //   queryFn: async ({ pageParam, queryKey: [_, type, query, category] }) => {
  //     const posts = await PostService.fetchPosts(pageParam, "dev", {
  //       query,
  //       category,
  //     });
  //     return posts; // 여기서 posts는 PostListDto[] 타입으로 추론됨
  //   },
  // });
}
