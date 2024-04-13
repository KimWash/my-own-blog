import {
  QueryClient,
  FetchQueryOptions,
  QueryKey,
  dehydrate,
} from "@tanstack/react-query";

export default async function useDehydratedState<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(args: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(args);
  /* const { queries } = dehydrate(queryClient);
  console.log(queries);
  const [dehydratedQuery] = queries.filter(
    (query) => query.queryKey === args.queryKey
  );
  console.log(dehydratedQuery); */
  return dehydrate(queryClient);
}
