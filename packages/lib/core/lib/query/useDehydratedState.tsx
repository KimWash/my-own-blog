import {
  QueryClient,
  FetchQueryOptions,
  QueryKey,
  dehydrate,
  QueryState,
} from "@tanstack/react-query";

export default async function getDehydratedState<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(args: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(args);
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

