import PostContainer from "@/components/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import getDehydratedState from '@my-own-blog/core/lib/query/useDehydratedState';
import { PostService } from "@/components/model/PostService";
import { HydrationBoundary } from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import { PageProps } from "@/app/magazine/post/[id]/page";

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const post = await PostService.fetchPost(id);
 
  return {
    title: post.title,
    openGraph: {
      images: [`https://blog-v2.kimwash.xyz/api/media/${post.medias.find(media => media.id === post.thumbnail_media)?.id}/HIGH`],
      description: post.description ?? 'Wh@t !s development?',
      releaseDate: post.create_dt?.toString()
    },
  }
}

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
