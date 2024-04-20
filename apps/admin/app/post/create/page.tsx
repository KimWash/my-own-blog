
import PostCreateContainer from '@/components/container/PostCreateContainer';
import client from '@db/prisma'

export default async function Page() {
  const initialMarkdown = await client.post.findFirst();
  return <PostCreateContainer initialMarkdown={initialMarkdown?.content ?? ''} />
}
