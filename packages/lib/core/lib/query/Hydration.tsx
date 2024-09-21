"use client";

import {
  DehydratedState,
  HydrationBoundary,
  HydrationBoundaryProps,
  MutationKey,
  MutationMeta,
  MutationState,
  QueryClientProvider,
  QueryKey,
  QueryMeta,
  QueryState,
  useQueryClient,
} from "@tanstack/react-query";

interface DehydratedQuery {
  queryHash: string;
  queryKey: QueryKey;
  state: QueryState;
  meta?: QueryMeta;
}

interface DehydratedMutation {
  mutationKey?: MutationKey;
  state: MutationState;
  meta?: MutationMeta;
}
export interface HydrationProps extends HydrationBoundaryProps {
  state?: DehydratedState;
  queries?: DehydratedQuery[];
  mutations?: DehydratedMutation[];
}

export function Hydration(props: HydrationProps) {
  return (
    <HydrationBoundary
      {...props}
      state={{
        ...props.state,
        queries: props.queries,
        mutations: props.mutations,
      }}
    >
    </HydrationBoundary>
  );
}
