import { fetchPosts } from "../queries/usePostListQuery";
import { useQuery } from "@tanstack/react-query";

// Todo: 뷰모델에 따른 DTO랑 entity model 분리
// Todo: MinIO 클라이언트 한번만 생성해서 캐싱하기, 이미지 자체도 캐싱하기

export default function useHomeViewModel() {
  return useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
}
