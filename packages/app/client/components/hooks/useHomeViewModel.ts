import { getQueryClient } from "@my-own-blog/core/lib/Providers";
import usePostListQuery, { BlogType } from "../queries/usePostListQuery";
// import { useQueryClient } from "@my-own-blog/core/lib/QueryClientProvider";
import { useQueryClient } from "@tanstack/react-query";

export default function useHomeViewModel(page: number, type: BlogType) {
  // console.log('client:: ', useQueryClient())
  return usePostListQuery(page, type);
}
