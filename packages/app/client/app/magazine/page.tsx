import Header from "@/components/magazine/Header";
import HomeContainer from "@/components/magazine/container/HomeContainer";
import { PostService } from "@/components/model/PostService";
import { PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";
import getDehydratedState from "@my-own-blog/core/lib/query/getDehydratedQuery";
import { useQueryClient } from "@tanstack/react-query";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ?? 1;
  const dehydratedState = await getDehydratedState({
    queryKey:PostQueryKey.search({type: 'magazine'}),
    queryFn: ({ queryKey: [_, page] }) => PostService.fetchPosts(Number(page), 'magazine'),
  });
  return (
    <>
      <Header />
      <Hydration queries={[dehydratedState]}>
        <HomeContainer />
      </Hydration>
    </>
  );
}
