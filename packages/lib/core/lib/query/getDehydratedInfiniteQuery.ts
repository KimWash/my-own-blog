import { QueryKey, FetchInfiniteQueryOptions, QueryClient, dehydrate, QueryState } from "@tanstack/react-query";

export async function getDehydratedInfiniteQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(args: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(args);
  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(
    (query) =>
      query.queryHash === (args.queryHash ?? JSON.stringify(args.queryKey))
  );
  console.log(args.queryKey, dehydratedQuery)

  return {
    ...dehydratedQuery,
    state: dehydratedQuery?.state as QueryState<TData, Error>
  }
}

