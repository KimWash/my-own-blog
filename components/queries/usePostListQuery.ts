"use client";

import { useQuery } from "react-query";
import fetchExtended from "@/lib/fetchExtended";
import { getAbsoluteUrl } from "@/lib/getAbsoluteUrl";
import { PostListDto } from "@/lib/model/Post";

const PostQueryKey = {
  all: ["posts"],
  paging: (page: number) => [...PostQueryKey.all, page],
};

export async function fetchPosts() {
  console.log('fetching...')
  return (await fetchExtended<PostListDto[]>("/api/post?page=1")).body;
}

export default async function usePostListQuery(page: number) {
  const postQuery = useQuery({
    queryKey: PostQueryKey.paging(page),
    queryFn: async ({ queryKey: [_, page] }) => {
      return await fetchPosts();
    },
    initialData: await fetchPosts(),
  });

  return postQuery;
}
