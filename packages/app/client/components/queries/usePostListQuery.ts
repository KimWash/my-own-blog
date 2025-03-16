import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { PostService } from "../model/PostService";
import { PostSearchParam } from "./useSearchQuery";

export const PostQueryKey = {
  all: ["posts"],
  search: (param: PostSearchParam) => [
    ...PostQueryKey.all,
    param.type,
    param.category,
    param.query,
  ],
};
export type BlogType = "dev" | "magazine";

export const PostListQueryOptions = (initialPage: number, type: BlogType) => {
  const size = 9;
  return infiniteQueryOptions({
    queryKey: ['postInfinite'],
    queryFn: ({ pageParam = 1 }) =>
      PostService.fetchPosts(Number(pageParam), type, { size }),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, __, lastPageParam) => lastPage.length == size ? lastPageParam + 1 : undefined,
  });
};

export default function usePostListQuery(page: number, type: BlogType) {
  return useInfiniteQuery(PostListQueryOptions(page, type));
}
