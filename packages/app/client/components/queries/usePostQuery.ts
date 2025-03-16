import { queryOptions, useQuery } from "@tanstack/react-query";
import { PostService } from "../model/PostService";


export const PostDetailQueryKey : (id:number) => [string, number] = (id) => ["post", id];

export const PostQueryOptions = (id: number) =>  queryOptions({
  queryKey: PostDetailQueryKey(id),
  queryFn: ({ queryKey: [_, id] }) => PostService.fetchPost(Number(id)),
})

export default function usePostQuery(id: number) {
  return useQuery(PostQueryOptions(id));
}
