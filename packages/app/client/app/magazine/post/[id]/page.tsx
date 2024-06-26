import PostContainer from "@/components/magazine/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import getDehydratedState from '@my-own-blog/core/lib/query/useDehydratedState';
import { PostService } from "@/components/model/PostService";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Page({ params }: { params: { id: number } }) {
  const dehydratedState = await getDehydratedState({
    queryKey: PostDetailQueryKey(params.id),
    queryFn: ({ queryKey: [_, id] }) => PostService.fetchPost(id),
  });
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostContainer id={params.id} />;
    </HydrationBoundary>
  );
}
