"use client";

import MarkdownEditor from "@/components/MarkdownEditor";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Editor } from "@toast-ui/react-editor";
import { PostDetailDto } from "@core/lib/model/Post";

type PostForm = Pick<
  PostDetailDto,
  | "content"
  | "title"
  | "description"
  | "update_dt"
  | "thumbnail_media"
  | "medias"
  | "tags"
>;

export default function PostCreateContainer({
  initialPost,
}: {
  initialPost?: PostDetailDto;
}) {
  const ref = useRef<Editor>(null);
  const emptyPost: PostForm = {
    title: "",
    content: "",
    update_dt: new Date(),
    description: "",
    thumbnail_media: null,
    medias: [],
    tags: [],
  };
  const [post, setPost] = useState(initialPost ?? emptyPost);
  const setPostField = (
    fieldName: keyof PostDetailDto,
    value: PostDetailDto[keyof PostDetailDto]
  ) => setPost((prev) => ({ ...prev, [fieldName]: value }));


  // Todo: Ref가 type때문인지 뭔지 전달이 안돼서 마크다운 내용을 가져오질 못하고 있어요.
  return (
    <div className="p-6">
      <div className="w-full mb-4">
        <p className="text-2xl mb-2">글 제목</p>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            placeholder="무엇을 작성해볼까요.."
            className="input input-bordered w-full "
            value={post.title}
            onChange={(e) => setPostField("title", e.target.value)}
          />
          <button className="btn" onClick={() => console.log(ref.current)}>
            작성하기
          </button>
        </div>
      </div>
      <div className="border">
        <MarkdownEditor
          initialMarkdown={initialPost?.content ?? ""}
          ref={ref}
        />
      </div>
    </div>
  );
}
