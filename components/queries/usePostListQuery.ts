import { useQuery } from "@tanstack/react-query";
import { PostService } from "../model/PostService";

export const PostQueryKey = {
  all: ["posts"],
  paging: (page: number) => [...PostQueryKey.all, page],
};

export default function usePostListQuery(page: number) {
  return useQuery({
    queryKey: PostQueryKey.paging(page),
    queryFn: ({ queryKey: [_, page] }) => PostService.fetchPosts(Number(page)),
  });
}
