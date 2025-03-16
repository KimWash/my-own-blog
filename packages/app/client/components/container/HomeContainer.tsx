"use client";

import { useContext, useEffect, useRef } from "react";
import FeaturedBanner from "../FeaturedBanner";
import PostCard from "../PostCard";
import useHomeViewModel from "../hooks/useHomeViewModel";
import usePage from "@my-own-blog/core/lib/usePage";

export default function HomeContainer() {
  const page = usePage();
  const bottomRef = useRef<HTMLDivElement>(null);
  const { data, isLoading, hasNextPage, fetchNextPage } = useHomeViewModel(Number(page), "dev");

  useEffect(() => {
    if (bottomRef.current) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        if (entries.length > 0 && entries[0].isIntersecting && !isLoading && hasNextPage)
           fetchNextPage();
      });
      intersectionObserver.observe(bottomRef.current)
    }
  }, [])

  if (!data || isLoading) return "loading...";
  if (data.pages.length == 0 || data.pages[0].length == 0)
    return "글이 없네요..?";
  return (
    <main className="flex flex-col">
      {data.pages.map((page, i) => (
        <>
          <FeaturedBanner
            no={i+1}
            key={page[0].id}
            {...page[0]}
            thumbnailUrl={page[0].thumbnailUrl}
            tags={page[0].tags}
          />
          <div className=" post-box">
            {page.slice(1, ).map((post) => (
              <PostCard
                key={post.id}
                {...post}
                thumbnailUrl={post.thumbnailUrl}
                tags={post.tags}
                containerClassName="flex-grid"
              />
            ))}
          </div>
        </>
      ))}
      <div ref={bottomRef}></div>
    </main>
  );
}
