import { PostBannerDto } from "@/lib/model/Post";
import { Post } from "@prisma/client";
import { useQuery } from "react-query";

const PostQueryKey = {
  all: ["posts"],
  paging: (page: number) => [...PostQueryKey.all, page],
};


export default async function usePostListQuery(page: number) {
  // const posts = useQuery({
  //   queryKey: PostQueryKey.paging(page),
  //   queryFn: async ({ queryKey: [_, page] }) => {
  //     return await (await fetch("/api/post/" + page)).json() as PostBannerDto[];
  //   },
  // });
  return await (
    await fetch("http://localhost:3000/api/post?page=" + page)
    ).json() as PostBannerDto[];
}
