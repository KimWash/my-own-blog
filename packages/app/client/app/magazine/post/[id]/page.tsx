import PostContainer from "@/components/magazine/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import getDehydratedState from '@my-own-blog/core/lib/query/useDehydratedState';
import { PostService } from "@/components/model/PostService";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: number }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id
  const post = await PostService.fetchPost(id);
 
  return {
    title: post.title,
    openGraph: {
      images: [`https://blog-v2.kimwash.xyz/media/${post.medias.find(media => media.id === post.thumbnail_media)?.id}/HIGH`],
      description: post.description!,
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
    <Hydration queries={[dehydratedState]}>
      <PostContainer id={params.id} />
    </Hydration>
  );
}
