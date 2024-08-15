"use client";

import usePostDetailViewModel from "../../hooks/usePostDetailViewModel";
import "@my-own-blog/core/lib/date/date.extensions";
import dynamic from "next/dynamic";
import Header from "../Header";
import { CSSTransition } from "react-transition-group";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
const TuiRenderer = dynamic(
  () => import("@my-own-blog/core/components/TuiRenderer"),
  { ssr: false }
);
import "@toast-ui/editor/dist/toastui-editor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function PostContainer({ id }: { id: number }) {
  const { data, isLoading } = usePostDetailViewModel(id);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, (lateset) => lateset * 10);
  const backButtonOpacity = useTransform(opacity, (opacity) => 1 - opacity);

  if (!data || isLoading) return "loading...";
  const { medias, tags, ...post } = data;
  console.log(
    medias,
    post.thumbnail_media,
    medias.find((media) => media.id === post.thumbnail_media)
  );
  return (
    <div className=" bg-orange-50 flex-col justify-start items-center inline-flex">
      <motion.div
        className="fixed w-full bg-orange-50 z-50"
        style={{ opacity: opacity }}
      >
        <Header />
      </motion.div>
      <motion.div
        className="fixed left-10 top-10"
        style={{ opacity: backButtonOpacity }}
      >
        <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
      </motion.div>
      <div className="w-full h-screen relative ">
        <Image
          // 진짜 멍청한 실수때문에 500 떴었네.. 가로 너비 창 사이즈 따라가게 하려고 썼던 window객체가 독이되어..
          src={`/api/media/${
            medias.find((media) => media.id === post.thumbnail_media)?.id
          }/HIGH`}
          width={"1920"}
          height={"100"}
          alt="bg"
          className="absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover z-10"
        />
        <div className="absolute bg-black bg-opacity-25 top-0 left-0 right-0 bottom-0 z-20"></div>
        <div className="absolute  px-10 py-[200px] flex-col justify-start items-start gap-2.5 flex z-30">
          <div className="text-white text-2xl font-extrabold ">
            {post.category.name}
          </div>
          <div className=" text-white text-[64px] font-bold ">{post.title}</div>
          <div className="  text-white text-4xl font-normal ">
            {post.description}
          </div>
          <div className=" text-white text-2xl font-normal ">
            {post.create_dt?.format("yyyy-MM-dd")}
          </div>
        </div>
      </div>
      <div className="self-stretch p-[60px] flex-col justify-center items-center gap-2.5 flex">
        <div className="mt-10 post-content">
          <TuiRenderer content={post?.content ?? ""} />
        </div>
      </div>
      <div className="self-stretch p-[60px] flex-col justify-center items-center gap-2.5 flex">
        <div className="self-stretch text-black text-[40px] font-extrabold ">
          댓글
        </div>
        준비중인 기능입니다.
      </div>
    </div>
  );
}
