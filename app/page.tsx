import FeaturedBanner from "@/components/FeaturedBanner";
import Main from "@/components/Main";
import PostCard from "@/components/PostCard";
import { fetchPosts } from "@/components/queries/usePostListQuery";
import {
  QueryClient,
  useQuery,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  // const { posts } = await useHomeViewModel();
  const queryClient = new QueryClient();
  console.log('render!')
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  })

  console.log(queryClient.getQueryData(['posts']))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Main />
    </HydrationBoundary>
  );
}
