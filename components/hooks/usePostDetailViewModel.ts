import db from 'db';

export default async function usePostDetailViewModel(id: number) {
  const post = await db.post.findFirst({
    where: { id: Number(id) },
    include: {
      tags: { include: { tag: true } },
      medias: { include: { files: true } },
    },
  });
  const medias = post?.medias;
  const tags = post?.tags.map((postTag) => postTag.tag);
  return {post, medias, tags}
}