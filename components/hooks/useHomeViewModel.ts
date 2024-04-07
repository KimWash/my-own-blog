import db from 'db'
import usePostListQuery from '../queries/usePostListQuery';
import { PostListDto } from '@/lib/model/Post';

// Todo: 뷰모델에 따른 DTO랑 entity model 분리
// Todo: MinIO 클라이언트 한번만 생성해서 캐싱하기, 이미지 자체도 캐싱하기

export default async function useHomeViewModel() {
  const posts = await usePostListQuery(0);
  return {posts: posts.map(post => ({...post, create_dt: new Date(post.create_dt!)}))};
}