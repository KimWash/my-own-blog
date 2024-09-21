import HomeContainer from "@/components/container/HomeContainer";
import { PostService } from "@/components/model/PostService";
import { PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from '@my-own-blog/core/lib/query/Hydration';
import getDehydratedState from '@my-own-blog/core/lib/query/getDehydratedQuery';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ?? 1;
  
  const dehydratedState = await getDehydratedState({
    queryKey: PostQueryKey.paging(Number(page)),
    queryFn: ({ queryKey: [_, page] }) => PostService.fetchPosts(Number(page), 'dev'),
  });
  console.log(dehydratedState)
  return (
    <Hydration queries={[dehydratedState]}>
      <HomeContainer />
    </Hydration>
  );
}
 