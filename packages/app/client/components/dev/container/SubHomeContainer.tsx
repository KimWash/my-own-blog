"use client";

import BigThumbnail from "../BIgThumbnail";
import FeaturedBanner from "../../FeaturedBanner";
import PostCard from "../../PostCard";
import useHomeViewModel from "../../hooks/useHomeViewModel";
import usePage from "@my-own-blog/core/lib/usePage";
import Image from "next/image";
import SmallThumbnail from "../SmallThumbnail";
import { Nanum_Myeongjo } from "next/font/google"; // 해당 폰트의 함수를 사용합니다.
import { PostListDto } from "@my-own-blog/core/lib/model/Post";
const font = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: "400",
});

export default function HomeContainer() {
  const page = usePage();
  const { data, isLoading } = useHomeViewModel(Number(page));
  if (!data || isLoading) return "loading...";
  return (
    <main className={`flex flex-col flex-1 p-10 ${font.className}`}>
      <div className="text-black text-xl font-bold mb-4">
        당신이 읽어봤으면 하는 것들,
        <br />
        고봉밥처럼 눌러 담아봤어요.
      </div>
      {data
        .reduce((acc, curr, idx) => {
          const threeIdx = Math.trunc(idx / 3);
          if (acc[threeIdx]) acc[threeIdx].push(curr);
          else acc[threeIdx] = [curr];
          return acc;
        }, [] as PostListDto[][])
        .map((posts) => (
          <div className="flex md:flex-row flex-col gap-4">
            <BigThumbnail
              title={posts[0].title}
              description={posts[0].description!}
              create_dt={posts[0].create_dt!}
              thumbnailUrl={posts[0].thumbnailUrl}
            />
            {posts[1] && (
              <div className="flex flex-row flex-1 gap-4">
                <SmallThumbnail
                  title={posts[1].title}
                  description={posts[1].description!}
                  create_dt={posts[1].create_dt!}
                  thumbnailUrl={posts[1].thumbnailUrl}
                />
                {posts[2] && (
                  <SmallThumbnail
                    title={posts[2].title}
                    description={posts[2].description!}
                    create_dt={posts[2].create_dt!}
                    thumbnailUrl={posts[2].thumbnailUrl}
                    className="md:justify-end"
                  />
                )}
              </div>
            )}
          </div>
        ))}
    </main>
  );
}
