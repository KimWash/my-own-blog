import HomeContainer from "@/components/container/HomeContainer";
import { fetchPosts } from "@/components/queries/usePostListQuery";
import useDehydratedQueryClient from "@/lib/query/useDehydratedQueryClient";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Home() {

  const queryClient = await useDehydratedQueryClient({
    queryKey: ["posts"],
    queryFn: async () => await fetchPosts(),
  });
  return (
    <HydrationBoundary state={queryClient}>
      <HomeContainer />
    </HydrationBoundary>
  );
}
