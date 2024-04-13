"use client";

import FeaturedBanner from "../FeaturedBanner";
import PostCard from "../PostCard";
import useHomeViewModel from "../hooks/useHomeViewModel";
import usePage from "@/lib/usePage";


export default function HomeContainer() {
  const page = usePage();
  const { data, isLoading } = useHomeViewModel(Number(page));
  if (!data || isLoading) return "loading...";
  return (
    <main className="flex flex-col">
      <FeaturedBanner
        no={data[0].id}
        key={data[0].id}
        {...data[0]}
        thumbnailUrl={data[0].thumbnailUrl}
        tags={data[0].tags}
      />
      <div
        className="flex flex-row flex-wrap w-full relative"
        style={{ flexFlow: "row wrap" }}
      >
        <div>
          {data.map((post) => (
            <PostCard
              key={post.id}
              {...post}
              thumbnailUrl={post.thumbnailUrl}
              tags={post.tags}
              containerClassName="flex-grid"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
