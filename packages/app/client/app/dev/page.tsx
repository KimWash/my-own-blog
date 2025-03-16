import HomeContainer from "@/components/container/HomeContainer";
import { PostService } from "@/components/model/PostService";
import { PostListQueryOptions, PostQueryKey } from "@/components/queries/usePostListQuery";
import { Hydration } from '@my-own-blog/core/lib/query/Hydration';
import getDehydratedState, { getDehydratedInfiniteState } from '@my-own-blog/core/lib/query/getDehydratedQuery';

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams?.page ?? 1;
  console.log(page)
  
  const dehydratedState = await getDehydratedInfiniteState(PostListQueryOptions(Number(page), 'dev'));
  console.log(dehydratedState)
  return (
    <Hydration queries={[dehydratedState]}>
      <HomeContainer /> 
    </Hydration>
  );
}
 