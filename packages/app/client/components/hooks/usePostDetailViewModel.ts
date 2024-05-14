import usePostQuery from "../queries/usePostQuery";

export default function usePostDetailViewModel(id: number) {
  return usePostQuery(id);
}
