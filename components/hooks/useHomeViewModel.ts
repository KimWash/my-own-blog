import usePostListQuery from "../queries/usePostListQuery";

export default function useHomeViewModel(page: number) {
  return usePostListQuery(page);
}
