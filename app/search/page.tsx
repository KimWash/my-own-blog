import PostContainer from "@/components/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import useDehydratedState from "@/lib/query/useDehydratedState";
import { PostService } from "@/components/model/PostService";
import { HydrationBoundary } from "@tanstack/react-query";
import SearchContainer from "@/components/container/SearchContainer";
import { PostQueryKey } from "@/components/queries/usePostListQuery";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);
  const query = searchParams?.query?.toString();
  const dehydratedState = await useDehydratedState({
    queryKey: PostQueryKey.search({ page, query }),
    queryFn: ({ queryKey: [_, page, query] }) =>
      PostService.fetchPosts(Number(page), query?.toString()),
  });
  console.log(dehydratedState.queries);
  // Todo: 이거 좀 최적화 해야할듯.. 타입 추론 어떻게 안되나..?
  if (
    (dehydratedState.queries.find(
      (q) =>
        q.queryHash === JSON.stringify(PostQueryKey.search({ page, query }))
    )?.state?.data as [] ?? []).length == 0 
  )
  // 디자인 만들기
    return "찾는 글이 없는 것 같아요.";
  return (
    <HydrationBoundary state={dehydratedState}>
      <SearchContainer query={query} />;
    </HydrationBoundary>
  );
}
