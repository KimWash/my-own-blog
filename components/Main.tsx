"use client";

import { useQuery } from "@tanstack/react-query";
import FeaturedBanner from "./FeaturedBanner";
import PostCard from "./PostCard";
import { fetchPosts } from "./queries/usePostListQuery";

export default function Main() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: fetchPosts });
  const posts = data!;
  console.log(posts)
  if (!posts) return '';
  return (
    <main className="flex flex-col">
      <FeaturedBanner
        no={posts[0].id}
        key={posts[0].id}
        {...posts[0]}
        thumbnailUrl={posts[0].thumbnailUrl}
        tags={posts[0].tags}
      />
      <div
        className="flex flex-row flex-wrap w-full relative"
        style={{ flexFlow: "row wrap" }}
      >
        <div>
          {posts.map((post) => (
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
