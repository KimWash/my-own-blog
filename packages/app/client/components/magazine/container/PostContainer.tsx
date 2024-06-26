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
  () => import("@my-own-blog/core/components/TuiRenderer")
);

export default function PostContainer({ id }: { id: number }) {
  const { data, isLoading } = usePostDetailViewModel(id);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, (lateset) => lateset * 10);
  console.log(scrollYProgress, opacity);

  if (!data || isLoading) return "loading...";
  const { medias, tags, ...post } = data;
  return (
    <div className=" bg-orange-50 flex-col justify-start items-center inline-flex">
      <motion.div
        className="fixed w-full bg-orange-50 z-50"
        style={{ opacity: opacity }}
      >
        <Header />
      </motion.div>
      <div className="w-full h-screen relative ">
        <Image
          src={`/api/media/${
            medias.find((media) => media.id === post.thumbnail_media)?.id
          }/HIGH`}
          alt="bg"
          width={window.innerWidth}
          height={window.innerHeight}
          className="absolute top-0 left-0 right-0 bottom-0 h-full w-full object-cover z-10"
        />
        <div className="absolute bg-black bg-opacity-25 top-0 left-0 right-0 bottom-0 z-20"></div>
        <div className="absolute  px-10 py-[200px] flex-col justify-start items-start gap-2.5 flex z-30">
          <div className="text-white text-2xl font-extrabold font-['NanumMyeongjo']">
            {post.category_id}
          </div>
          <div className=" text-white text-[64px] font-bold font-['NanumMyeongjo']">
            {post.title}
          </div>
          <div className="  text-white text-4xl font-normal font-['NanumMyeongjo']">
            {post.description}
          </div>
          <div className=" text-white text-2xl font-normal font-['NanumMyeongjo']">
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
        <div className="self-stretch text-black text-[40px] font-extrabold font-['NanumMyeongjo']">
          댓글
        </div>
        준비중인 기능입니다.
      </div>
    </div>
  );
}
