import db from 'db'

export default async function useHomeViewModel() {
  const posts = await db.post.findMany({
    where: {
      is_deleted: undefined,
    },
    include: {
      tags: { include: { tag: true } },
      thumbnail: true,
    },
  });
  return {posts};
}