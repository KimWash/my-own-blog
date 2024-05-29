"use client";

import usePostDetailViewModel from "../hooks/usePostDetailViewModel";
import "@my-own-blog/core/lib/date/date.extensions";
import dynamic from "next/dynamic";
const TuiRenderer = dynamic(
  () => import("@my-own-blog/core/components/TuiRenderer")
);

export default function PostContainer({ id }: { id: number }) {
  const { data, isLoading } = usePostDetailViewModel(id);
  if (!data || isLoading) return "loading...";
  const { medias, tags, ...post } = data;

  return (
    <div className="p-8">
      {tags?.map((tag) => (
        <span key={tag.id}>#{tag.name} </span>
      ))}
      <div className="flex flex-row justify-between items-end">
        <h1>{post?.title}</h1>
        <p>{post?.create_dt?.format("yyyy년 MM월 dd일")}</p>
      </div>
      <hr className="border-1 border-gray-400" />
      <p>{post?.description}</p>

      <div className="mt-10 post-content">
        <TuiRenderer content={post?.content ?? ""} />
      </div>
    </div>
  );
}
