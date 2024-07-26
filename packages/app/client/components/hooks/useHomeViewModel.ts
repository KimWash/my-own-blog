import usePostListQuery, { BlogType } from "../queries/usePostListQuery";

export default function useHomeViewModel(page: number, type: BlogType) {
  return usePostListQuery(page, type);
}
