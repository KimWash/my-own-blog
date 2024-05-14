import { useQuery } from "@tanstack/react-query";
import { PostService } from "../model/PostService";

export const PostDetailQueryKey : (id:number) => [string, number] = (id) => ["post", id];

export default function usePostQuery(id: number) {
  return useQuery({
    queryKey: PostDetailQueryKey(id),
    queryFn: ({ queryKey: [_, id] }) => PostService.fetchPost(Number(id)),
  });
}
