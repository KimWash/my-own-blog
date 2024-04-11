"use client";

import fetchExtended from "@/lib/fetchExtended";
import { PostDetailDto } from "@/lib/model/Post";

export default async function usePostQuery(id: number) {
  const post = (
    await fetchExtended<PostDetailDto>("/api/post/" + id, {
      method: "GET",
    })
  ).body;
  return post;
}
