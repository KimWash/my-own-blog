"use client";

import usePostDetailViewModel from "../../hooks/usePostDetailViewModel";
import "@my-own-blog/core/lib/date/date.extensions";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
const BlockNoteViewer = dynamic(
  () => import("@my-own-blog/core/components/BlockNoteViewer"),
  { ssr: false }
);
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Giscus from "@/components/Giscus";

export default function PostContainer({
  id,
  isApp = false,
  header,
}: {
  id: number;
  isApp?: boolean;
  header: React.ReactNode;
}) {
  console.log(JSON.stringify(useQueryClient()));
  const { data, isLoading } = usePostDetailViewModel(id);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, (lateset) => lateset * 10);
  const backButtonOpacity = useTransform(opacity, (opacity) => 1 - opacity);
  useEffect(() => {
    console.log(isApp);
  }, [isApp]);

  if (!data || isLoading) return "loading...";
  const { medias, tags, ...post } = data;

  return (
    <div className=" bg-orange-50 flex-col justify-start items-center inline-flex">
      {!isApp && (
        <motion.div
          className="fixed w-full bg-orange-50 z-50"
          style={{ opacity: opacity }}
        >
          {header}
        </motion.div>
      )}
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
        <div className="absolute inset-x-0 px-6 py-28 md:px-10 md:py-[200px] max-w-3xl flex-col justify-start items-start gap-3 flex z-30">
          <div className="text-white text-lg md:text-2xl font-extrabold tracking-tight">
            {post.category.name}
          </div>
          <div className="text-white text-[2rem] leading-tight md:text-[64px] md:leading-[1.1] font-bold tracking-tight break-keep">
            {post.title}
          </div>
          <div className="text-white text-xl md:text-4xl font-normal leading-snug tracking-tight break-keep">
            {post.description}
          </div>
          <div className="text-white text-base md:text-2xl font-normal tracking-tight">
            {post.create_dt?.format("yyyy-MM-dd")}
          </div>
        </div>
      </div>
      <div className="self-stretch  flex-col justify-center items-center gap-2.5 flex">
   <div className="mt-10 ">
          <BlockNoteViewer content={post.postContent?.content} />
        </div>
      </div>
      <div className="self-stretch px-6 py-10 md:p-[60px] flex-col justify-center items-center gap-2.5 flex">
        <div className="self-stretch text-black text-3xl md:text-[40px] font-extrabold ">
          댓글
        </div>
        <div className="self-stretch">

        <Giscus/>
        </div>

      </div>
    </div>
  );
}
