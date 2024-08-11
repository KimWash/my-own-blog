import PostContainer from "@/components/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import getDehydratedState from "@my-own-blog/core/lib/query/useDehydratedState";
import { PostService } from "@/components/model/PostService";
import { HydrationBoundary } from "@tanstack/react-query";
import SearchContainer from "@/components/container/SearchContainer";
import { BlogType, PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.query?.toString();
  const dehydratedQuery = await getDehydratedState({
    queryKey: PostQueryKey.search({ page, query }),
    queryFn: ({ queryKey: [_, page, query] }) =>
      PostService.fetchPosts(Number(page), query as BlogType),
  });
  // Todo: 이거 좀 최적화 해야할듯.. 타입 추론 어떻게 안되나..?
  if (dehydratedQuery.state.data?.length == 0)
    // 디자인 만들기
    return "찾는 글이 없는 것 같아요.";
  return (
    <Hydration queries={[dehydratedQuery]}>
      <SearchContainer query={query} />;
    </Hydration>
  );
}
