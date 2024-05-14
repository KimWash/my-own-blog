import { useQuery } from "@tanstack/react-query";
import { PostQueryKey, PostSearchParam } from "../queries/usePostListQuery";
import { PostService } from "../model/PostService";

export default function useSearchViewModel(param: PostSearchParam) {
  return useQuery({
    queryKey: PostQueryKey.search(param),
    queryFn: ({ queryKey: [_, page, query] }) =>
      PostService.fetchPosts(Number(page), query?.toString()),
  });
}
