import { PostDetail } from "../../../../lib/model/Post";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id;
  const post = {
    id: 1,
    title: '대충 게시글 제목',
    date: new Date(),
    description: '대충 게시글 설명입니다.',
    tags: ['태그1', '태그2'],
    content: `# 1\n## 2\n### 3\n개행 안된거\n\n개행 된거\n\n\`This is code\``,
    thumbnailUrl: 'https://picsum.photos/seed/picsum/400/280'
  } as PostDetail;
  return Response.json(post)
}