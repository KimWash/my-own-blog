import {
  QueryClient,
  FetchQueryOptions,
  QueryKey,
  dehydrate,
  QueryState,
  FetchInfiniteQueryOptions,
} from "@tanstack/react-query";

export default async function getDehydratedQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(args: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(args);
  const { queries, mutations } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(
    (query) =>
      query.queryHash === (args.queryHash ?? JSON.stringify(args.queryKey))
  );
  console.log(queries, args.queryKey, dehydratedQuery)

  return {
    ...dehydratedQuery,
    state: dehydratedQuery.state as QueryState<TData, Error>
  }
}

export async function getDehydratedInfiniteState<
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

  return {
    ...dehydratedQuery,
    state: dehydratedQuery.state as QueryState<TData, Error>
  }
}

