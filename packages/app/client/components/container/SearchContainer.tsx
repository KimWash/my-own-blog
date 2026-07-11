"use client";

import PostCard from "../PostCard";
import useSearchViewModel from "../hooks/useSearchViewModel";

export default function SearchContainer({ query }: { query?: string }) {
  const { data, isLoading } = useSearchViewModel({ type: 'dev', query });
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
