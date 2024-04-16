"use client";

import usePage from "@/lib/usePage";
import PostCard from "../PostCard";
import useSearchViewModel from "../hooks/useSearchViewModel";

export default function SearchContainer({ query }: { query?: string }) {
  const page = usePage();
  const { data, isLoading } = useSearchViewModel({ page, query });
  if (!data || isLoading) return "loading...";
  return (
    <main className="flex flex-col">
      <div className=" post-box">
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
    </main>
  );
}
