import { BlogType } from "../queries/usePostListQuery";
import useSearchQuery, { PostSearchParam } from "../queries/useSearchQuery";

export default function useSearchViewModel(param: PostSearchParam) {
  console.log(param)
  return useSearchQuery(param)
}
