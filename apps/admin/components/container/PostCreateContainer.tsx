"use client";

import MarkdownEditor from "@/components/MarkdownEditor";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Editor } from "@toast-ui/react-editor";
import { PostDetailDto, TagDto } from "@core/lib/model/Post";
import { UploadPostDto, createPost } from "../actions/post/create";
import Tag from "@core/components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type TagForm = Pick<TagDto, "name" | "id">;
type PostForm = Pick<
  PostDetailDto,
  | "content"
  | "title"
  | "description"
  | "update_dt"
  | "thumbnail_media"
  | "medias"
> & { tags: (TagForm | TagDto)[] };

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
  function setPostField<T extends PostForm[keyof PostForm]>(
    fieldName: keyof PostForm,
    valueOrUpdater: T | ((prevValue: T) => T)
  ) {
    setPost((prev) => ({
      ...prev,
      [fieldName]:
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev[fieldName] as T)
          : valueOrUpdater,
    }));
  }
  const [newTag, setNewTag] = useState("");

  // Todo: Ref가 type때문인지 뭔지 전달이 안돼서 마크다운 내용을 가져오질 못하고 있어요.
  return (
    <div className="p-3 flex flex-row h-full">
      <div className=" w-3/4 lg:w-5/6 border border-black rounded-lg p-3 ">
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
          </div>
        </div>
        <MarkdownEditor
          initialMarkdown={initialPost?.content ?? ""}
          forwardedRef={ref}
        />
      </div>
      <div className="border ml-3 p-3 rounded-lg border-black flex flex-col justify-between">
        <div>
        <p>글 설명</p>
        <textarea
          value={post.description ?? ""}
          onChange={({ target }) => setPostField("description", target.value)}
          className="textarea textarea-bordered w-full"
          placeholder="어떤 글인지 간단하게 적어볼까요?"
        />
        <p>태그</p>
        <div className="border rounded-lg w-full p-2 border-base-300 overflow-scroll ">
          {post.tags.map((tag) => (
            <Tag className="whitespace-nowrap m-0.5" key={tag.id}>
              {tag.name}{" "}
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="cursor-pointer"
                onClick={() =>
                  setPostField<TagDto[]>("tags", (prev) =>
                    prev.filter((tagToFind) => tagToFind.id !== tag.id)
                  )
                }
              />
            </Tag>
          ))}
          <label className=" flex items-center gap-2">
            <input
              type="text"
              className="w-full border-b"
              placeholder="태그를 입력하세요.."
              value={newTag}
              onChange={({ target }) => setNewTag(target.value)}
              onKeyDown={({ nativeEvent, key }) => {
                if (key == "Enter" && !nativeEvent.isComposing) {
                  setPostField<TagDto[]>("tags", (prev) => [
                    ...prev,
                    {
                      id: Math.max(...prev.map((tag) => tag.id)) + 1,
                      name: newTag,
                      create_dt: new Date(),
                      is_deleted: false,
                      post_id: 2,
                    },
                  ]);
                  setNewTag("");
                }
              }}
            />
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faCircleXmark}
              onClick={() => setNewTag("")}
            />
          </label>
        </div>
        <p>미디어</p>
        <div className="flex flex-row gap-2 overflow-scroll">
          {post.medias.map((media) => (
            <Image
              key={media.id}
              src={`/api/media/${media.id}/HIGH`}
              width="100"
              height="100"
              className="aspect-square"
              alt={media.name ?? ''}
            />
          ))}
        </div>
        </div>
        <button
          className="btn"
          onClick={() =>
            createPost({ ...post, mediaIds: [], thumbnail_media: 2 })
          }
        >
          작성하기
        </button>
      </div>
    </div>
  );
}
