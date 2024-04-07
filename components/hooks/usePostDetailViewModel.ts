import usePostQuery from "../queries/usePostQuery";

export default async function usePostDetailViewModel(id: number) {
  const post = await usePostQuery(id);
  return { ...post, create_dt: new Date(post.create_dt!) };
}
