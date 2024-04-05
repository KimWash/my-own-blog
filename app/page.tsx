import FeaturedBanner from "@/components/FeaturedBanner";
import PostCard from "@/components/PostCard";
import useHomeViewModel from "@/components/hooks/useHomeViewModel";
import db from "db";

export default async function Home() {
  const { posts } = await useHomeViewModel();
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
