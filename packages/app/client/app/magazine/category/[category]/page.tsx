import getDehydratedState from "@my-own-blog/core/lib/query/useDehydratedState";
import { PostService } from "@/components/model/PostService";
import { BlogType, PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";
import Header from "@/components/magazine/Header";
import PostListContainer from "@/components/magazine/container/PostListContainer";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams?.page ?? 1);
  const category = searchParams?.category?.toString();
  const dehydratedQuery = await getDehydratedState({
    queryKey: PostQueryKey.search({ page, type: 'magazine', category }),
    queryFn: ({ queryKey: [_, page, category] }) =>
        PostService.fetchPosts(Number(page), 'magazine', {category: category?.toString()}),
    });
  if (dehydratedQuery.state.data?.length == 0)
    // 디자인 만들기
    return "찾는 글이 없는 것 같아요.";
  return (
    <>
      <Header />
    <Hydration queries={[dehydratedQuery]}>
      <PostListContainer category={category} />
    </Hydration>
    </>
  );
}
