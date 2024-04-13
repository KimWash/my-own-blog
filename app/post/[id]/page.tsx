import PostContainer from "@/components/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import useDehydratedState from "@/lib/query/useDehydratedState";
import { PostService } from "@/components/model/PostService";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Page({ params }: { params: { id: number } }) {
  const dehydratedState = await useDehydratedState({
    queryKey: PostDetailQueryKey(params.id),
    queryFn: ({ queryKey: [_, id] }) => PostService.fetchPost(Number(id)),
  });
  return (
    <HydrationBoundary state={dehydratedState}>
      <PostContainer id={params.id} />;
    </HydrationBoundary>
  );
}
