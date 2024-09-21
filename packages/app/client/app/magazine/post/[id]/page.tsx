import PostContainer from "@/components/magazine/container/PostContainer";
import { PostDetailQueryKey } from "@/components/queries/usePostQuery";
import { PostService } from "@/components/model/PostService";
import { Hydration } from "@my-own-blog/core/lib/query/Hydration";
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import Header from "@/components/magazine/Header";
import getDehydratedQuery from "@my-own-blog/core/lib/query/getDehydratedQuery";

export type PageProps = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const post = await PostService.fetchPost(id);

  return {
    title: post.title,
    openGraph: {
      images: [
        `https://blog-v2.kimwash.xyz/api/media/${
          post.medias.find((media) => media.id === post.thumbnail_media)?.id
        }/HIGH`,
      ],
      description: post.description!,
      releaseDate: post.create_dt?.toString(),
    },
  };
}

export default async function Page({ params }: { params: { id: number } }) {
  const dehydratedQuery = await getDehydratedQuery({
    queryKey: PostDetailQueryKey(params.id),
    queryFn: ({ queryKey: [_, id] }) => PostService.fetchPost(id),
  });
  const isApp = headers().get("User-Agent")?.includes("magangzine");
  
  return (
    <Hydration queries={[dehydratedQuery]} >
      <PostContainer id={params.id} isApp={isApp} header={<Header />} />
    </Hydration>
  );
}
