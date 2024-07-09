import useMenuQuery from "../queries/useMenuQuery";

export default function useMenu() {
    const query = useMenuQuery();
    return query;
}