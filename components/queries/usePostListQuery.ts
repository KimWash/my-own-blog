import { getAbsoluteUrl } from "@/lib/getAbsoluteUrl";
import { PostBannerDto } from "@/lib/model/Post";

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
  
  return (await (
    await fetch("http://" + getAbsoluteUrl() + "/api/post?page=" + page)
  ).json()) as PostBannerDto[];
}
