import HomeContainer from "@/components/container/HomeContainer";
import { PostService } from "@/components/model/PostService";
import { PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from "@/lib/query/Hydration";
import useDehydratedState from "@/lib/query/useDehydratedState";
import { HydrationBoundary } from "@tanstack/react-query";



export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ?? 1;
  
  const dehydratedState = await useDehydratedState({
    queryKey: PostQueryKey.paging(Number(page)),
    queryFn: ({ queryKey: [_, page] }) => PostService.fetchPosts(Number(page)),
  });
  return (
    <Hydration queries={[dehydratedState]}>
      <HomeContainer />
    </Hydration>
  );
}
