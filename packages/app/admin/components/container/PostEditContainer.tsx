"use client";

import { useCallback, useRef, useState } from "react";
import { Editor } from "@toast-ui/react-editor";
import { PostDetailDto, TagDto } from "@my-own-blog/core/lib/model/Post";
import Tag from "@my-own-blog/core/components/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faExpand,
  faImage,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import dynamic from "next/dynamic";
import menus_temp from "@/assets/menus_temp.json";
import classNames from "classnames";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
  ResponderProvided,
} from "react-beautiful-dnd";

interface MenuItem {
  id: string;
  name: string;
  type: string;
  children?: MenuItem[];
}

const LeafMenu = ({
  isSelected,
  onClick,
  children,
}: React.PropsWithChildren<{
  isSelected: boolean;
  onClick: () => void;
}>) => {
  return (
    <div
      className={classNames({
        "rounded-md p-2 hover:bg-base-300 cursor-pointer": true,
        "bg-base-300": isSelected,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const ToastEditor = dynamic(() => import("../ToastEditor"), { ssr: false });

type TagForm = Pick<TagDto, "name" | "id">;
export type PostForm = Pick<
  PostDetailDto,
  | "content"
  | "title"
  | "description"
  | "update_dt"
  | "thumbnail_media"
  | "category_id"
> & { tags: (TagForm | TagDto)[]; mediaIds: number[] };

export default function PostEditContainer({
  initialPost,
  initialCategory,
  onSubmit,
}: {
  initialPost?: PostDetailDto;
  initialCategory: string;
  onSubmit: (id: number, post: PostForm) => void;
}) {
  const ref = useRef<Editor>();
  const emptyPost: PostForm = {
    title: "",
    content: "",
    update_dt: new Date(),
    description: "",
    thumbnail_media: null,
    mediaIds: [],
    tags: [],
    category_id: initialCategory,
  };

  const [post, setPost] = useState(
    {
      ...initialPost,
      mediaIds: initialPost?.medias.map((media) => media.id),
    } ?? emptyPost
  );
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
  const [focusedMediaId, setFocusedMediaId] = useState<number | null>(null);
  const rootMenus = menus_temp;
  const [menus, setMenus] = useState(rootMenus);

  const menuElements = (menus: typeof rootMenus) => {
    return menus.map((menu, i) => {
      return menu.children !== undefined ? (
        <div key={menu.id}>
          <Draggable draggableId={`menu-${menu.id}`} index={i} key={menu.id}>
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                >
                  <summary
                    onClick={() => setPostField("category_id", menu.id)}
                    className={classNames({
                      "bg-base-300": post.category_id === menu.id,
                    })}
                  >
                    {menu.name}
                  </summary>
                  <ul>{menuElements(menu.children)}</ul>
                </div>
              </>
            )}
          </Draggable>
        </div>
      ) : (
        <LeafMenu
          key={menu.id}
          isSelected={post.category_id === menu.id}
          onClick={() => setPostField("category_id", menu.id)}
        >
          {menu.name}
        </LeafMenu>
      );
    });
  };
  
  const onBeforeCapture = useCallback(() => {}, []);
  const onBeforeDragStart = useCallback(() => {}, []);
  const onDragStart = useCallback(() => {}, []);
  const onDragUpdate = useCallback(() => {}, []);

  const reorder = (list: MenuItem[], startIndex: number, endIndex: number) => {
    const result = [...list];
    // 요소 제거
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);
    return result;
  };
  const onDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      // 리스트의 바깥에 놓음
      if (!result.destination) return;

      const movedMenus = reorder(
        menus,
        result.source.index,
        result.destination.index
      );
      setMenus(() => {
        console.log(movedMenus);
        return movedMenus;
      });
    },
    [menus]
  );

  const grid = 8;

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    // some basic styles to make the items look a bit nicer
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

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
        <ToastEditor
          initialValue={initialPost?.content ?? ""}
          addImage={(file) => {
            setPost((prev) => ({
              ...prev,
              mediaIds: [...(prev.mediaIds ?? []), file.mediaId!],
              thumbnail_media: !prev.mediaIds
                ? file.mediaId!
                : prev.thumbnail_media,
            }));
          }}
          forwardedRef={ref}
        />
      </div>
      <div className="border ml-3 p-3 rounded-lg border-black flex flex-col justify-between">
        <div>
          <p>카테고리</p>
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="d-1">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {menuElements(menus)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <p>글 설명</p>
          <textarea
            value={post.description ?? ""}
            onChange={({ target }) => setPostField("description", target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="어떤 글인지 간단하게 적어볼까요?"
          />
          <p>태그</p>
          <div className="border rounded-lg w-full p-2 border-base-300 overflow-scroll ">
            {post.tags?.map((tag) => (
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
                      ...(prev ?? []),
                      {
                        id: Math.max(...(prev ?? []).map((tag) => tag.id)) + 1,
                        name: newTag,
                        create_dt: new Date(),
                        is_deleted: false,
                        post_id: post.id ?? null,
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
            {post.mediaIds?.map((mediaId) => (
              <div
                key={mediaId}
                className="relative"
                onClick={() => {
                  // Todo: 클릭 시 오버레이 생기고 이미지 최대화/썸네일 지정 가능하게
                  setFocusedMediaId(mediaId);
                }}
              >
                {focusedMediaId == mediaId ? (
                  <>
                    <div className=" absolute top-0 left-0 right-0 bottom-0 opacity-50 bg-gray-800 "></div>
                    <div
                      onClick={() => {
                        console.log("clicked");
                        setFocusedMediaId(-1);
                      }}
                      className="absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center gap-4"
                    >
                      <FontAwesomeIcon
                        onClick={() => alert("삭제")}
                        icon={faTrashCan}
                        color="white"
                      />
                      <FontAwesomeIcon
                        onClick={() => alert("확장")}
                        icon={faExpand}
                        color="white"
                      />
                      <FontAwesomeIcon
                        onClick={() =>
                          setPostField<number>("thumbnail_media", mediaId)
                        }
                        icon={faImage}
                        color="white"
                      />
                    </div>
                  </>
                ) : null}
                {(post.thumbnail_media ?? 0) === mediaId && (
                  <Tag className="absolute top-1 left-1 text-xs" color="black">
                    썸네일
                  </Tag>
                )}
                <Image
                  key={mediaId}
                  src={`/api/media/${mediaId}/HIGH`}
                  width="100"
                  height="100"
                  className="aspect-square"
                  alt={"media"}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn"
          onClick={() => {
            if (!post.title) alert("제목을 입력해주세요.");
            else
              onSubmit(post.id ?? -1, {
                title: post.title!,
                content: ref.current?.getInstance().getMarkdown(),
                description: post.description!,
                mediaIds: post.mediaIds!,
                thumbnail_media: post.thumbnail_media!,
                tags: post.tags!,
                category_id: post.category_id!,
                update_dt: null,
              });
          }}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}
