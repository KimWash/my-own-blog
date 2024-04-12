import { cache } from "react";
import {
  QueryClient,
  FetchQueryOptions,
  QueryKey,
  dehydrate
} from "@tanstack/react-query";
import { getQueryClient, makeQueryClient } from "../Providers";


export default async function useDehydratedQueryClient<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(args: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const queryClient = new QueryClient();
  console.log(args)
  await queryClient.prefetchQuery(args);
  return dehydrate(queryClient);
}
