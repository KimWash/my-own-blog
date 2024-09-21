import fetchExtended from "@my-own-blog/core/lib/fetchExtended";
import useMenuQuery from "../queries/useMenuQuery";
import { MenuItem } from "@my-own-blog/core/types/Menu";

export default async function useMenu() {
    const query = (await fetchExtended<MenuItem[]>('/api/menu')).body;
    return query;
}