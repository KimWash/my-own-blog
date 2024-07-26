import { useQuery } from "@tanstack/react-query";
import { PostService } from "../model/PostService";

export interface PostSearchParam {
  page: number;
  query?: string;
}

export const PostQueryKey = {
  all: ["posts"],
  paging: (page: number) => [...PostQueryKey.all, page],
  search: (param: PostSearchParam) => [...PostQueryKey.all, param.page, param.query]
};
export type BlogType = 'dev' | 'magazine'

export default function usePostListQuery(page: number, type: BlogType) {
  return useQuery({
    queryKey: PostQueryKey.paging(page),
    queryFn: ({ queryKey: [_, page] }) => PostService.fetchPosts(Number(page), type),
  });
}
