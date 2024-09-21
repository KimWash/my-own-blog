import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import { MenuItem } from "@my-own-blog/core/types/Menu";
import { useQuery } from "@tanstack/react-query";

export default function useMenuQuery() {
  return useQuery({
    queryKey: ['menus'],
    queryFn: async ({ queryKey: [_, page] }) => (await fetchExtended<MenuItem[]>('/api/menu')).body,
  });

}
