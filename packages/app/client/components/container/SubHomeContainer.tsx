"use client";

import BigThumbnail from "../BIgThumbnail";
import FeaturedBanner from "../FeaturedBanner";
import PostCard from "../PostCard";
import useHomeViewModel from "../hooks/useHomeViewModel";
import usePage from "@my-own-blog/core/lib/usePage";
import Image from "next/image";
import SmallThumbnail from "../SmallThumbnail";
import { Nanum_Myeongjo } from "next/font/google"; // 해당 폰트의 함수를 사용합니다.
const font = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: "400",
});

export default function HomeContainer() {
  const page = usePage();
  const { data, isLoading } = useHomeViewModel(Number(page));
  if (!data || isLoading) return "loading...";
  return (
    <main
      className={`flex flex-col flex-1 p-10 ${font.className}`}
      style={{ background: "#FFF2E7" }}
    >
      <div className="text-black text-xl font-bold mb-4">
        당신이 읽어봤으면 하는 것들,
        <br />
        고봉밥처럼 눌러 담아봤어요.
      </div>
      <div className="flex md:flex-row flex-col gap-4">
        {/* big post area */}
        {/* small posts */}
        <BigThumbnail
          title="속초에서 찾은 익숙한 고향 풍경"
          description="영금정, 속초아이가 아닌 진짜 속초"
          create_dt={new Date()}
          thumbnailUrl="https://via.placeholder.com/293x178"
        />
        <div className="flex flex-row flex-1 gap-4">
          <SmallThumbnail
            title={"매서운 겨울바람 지나고 찾아온 초록빛"}
            description={"전역을 1년 앞둔 시점에서 지난 6개월 톺아보기"}
            create_dt={new Date()}
            thumbnailUrl="https://via.placeholder.com/293x178"
          />
          <SmallThumbnail
            title={"매서운 겨울바람 지나고 찾아온 초록빛"}
            description={"전역을 1년 앞둔 시점에서 지난 6개월 톺아보기"}
            create_dt={new Date()}
            className="md:justify-end"
            thumbnailUrl="https://via.placeholder.com/293x178"
          />
        </div>
      </div>
    </main>
  );
}
