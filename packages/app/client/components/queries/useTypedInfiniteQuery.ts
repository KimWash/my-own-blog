import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
  QueryClient,
  DefaultError,
  DefinedInitialDataInfiniteOptions,
  DefinedUseInfiniteQueryResult,
  UndefinedInitialDataInfiniteOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";

// Overload signatures to handle cases with and without `initialData`
function useTypedInfiniteQuery<
  TQueryFnData,
>(
  options: DefinedInitialDataInfiniteOptions<
    TQueryFnData,
    DefaultError,
    InfiniteData<TQueryFnData, number>,
    (string|undefined)[],
    number
  >,
  queryClient?: QueryClient
): DefinedUseInfiniteQueryResult<InfiniteData<TQueryFnData, number>, DefaultError>;

function useTypedInfiniteQuery<
  TQueryFnData,
>(
  options: UndefinedInitialDataInfiniteOptions<
    TQueryFnData,
    DefaultError,
    InfiniteData<TQueryFnData, number>,
    (string|undefined)[],
    number
  >,
  queryClient?: QueryClient
): UseInfiniteQueryResult<InfiniteData<TQueryFnData, number>, DefaultError>;

// General implementation
function useTypedInfiniteQuery<
  TQueryFnData,
>(
  options: UseInfiniteQueryOptions<
    TQueryFnData,
    DefaultError,
    InfiniteData<TQueryFnData, number>,
    TQueryFnData,
    (string|undefined)[],
    number
  >,
  queryClient?: QueryClient
): UseInfiniteQueryResult<InfiniteData<TQueryFnData, number>, DefaultError> {
  return useInfiniteQuery<TQueryFnData, DefaultError, InfiniteData<TQueryFnData, number>, (string|undefined)[], number>(
    options,
    queryClient
  );
}
export { useTypedInfiniteQuery };
