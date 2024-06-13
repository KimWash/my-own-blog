"use client";

import FeaturedBanner from "../FeaturedBanner";
import PostCard from "../PostCard";
import useHomeViewModel from "../hooks/useHomeViewModel";
import usePage from "@my-own-blog/core/lib/usePage";
import Image from "next/image";
export default function HomeContainer() {
  const page = usePage();
  const { data, isLoading } = useHomeViewModel(Number(page));
  if (!data || isLoading) return "loading...";
  return (
    <main
      className={`flex flex-col flex-1 p-10`}
      style={{ background: "#FFF2E7" }}
    >
      <div className="text-black text-xl font-bold ">
        당신이 읽어봤으면 하는 것들,
        <br />
        고봉밥처럼 눌러 담아봤어요.
      </div>
      <div className="flex flex-row">
        {/* big post area */}
        <div className="flex flex-col " style={{flex: 2}}>
          <Image
            src="https://via.placeholder.com/588x357"
            alt="alt"
            width={588}
            height={357}
          />
          <div className=" text-black text-[32px] font-bold ">
            속초에서 찾은 익숙한 고향 풍경
          </div>
          <div className=" text-black text-xl font-normal">
            영금정, 속초아이가 아닌 진짜 속초
          </div>
        </div>
        {/* small posts */}
        <div className="flex flex-col flex-1 justify-start">
            <Image
              src="https://via.placeholder.com/293x178"
              alt="alt"
              width={293}
              height={178}
            />
            <div className=" text-black text-xl font-bold font-['NanumMyeongjo']">
              매서운 겨울바람 지나고 찾아온 초록빛
            </div>
            <div className=" text-black text-[15px] font-normal font-['NanumMyeongjo']">
              전역을 1년 앞둔 시점에서 지난 6개월 톺아보기
            </div>
            <div className=" text-black text-[15px] font-normal font-['NanumMyeongjo']">
              2024. 06. 08
            </div>
          </div>
          <div className="flex flex-col flex-1 justify-end">
            <Image
              src="https://via.placeholder.com/293x178"
              alt="alt"
              width={293}
              height={178}
            />
            <div className=" text-black text-xl font-bold font-['NanumMyeongjo']">
              매서운 겨울바람 지나고 찾아온 초록빛
            </div>
            <div className=" text-black text-[15px] font-normal font-['NanumMyeongjo']">
              전역을 1년 앞둔 시점에서 지난 6개월 톺아보기
            </div>
            <div className=" text-black text-[15px] font-normal font-['NanumMyeongjo']">
              2024. 06. 08
            </div>
          </div>
      </div>
    </main>
  );
}
