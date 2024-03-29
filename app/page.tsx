import FeaturedBanner from "@/components/FeaturedBanner";
import PostCard from "@/components/PostCard";
import db from "db";

export default async function Home() {
  const posts = await db.post.findMany({
    include: {
      tags: { include: { tag: true } },
      thumbnail: true,
    },
  });
  return (
    <main className="flex flex-col">
      <FeaturedBanner
        no={posts[0].id}
        key={posts[0].id}
        {...posts[0]}
        thumbnailUrl={posts[0].thumbnail?.url ?? ''}
        tags={posts[0].tags.map((post_tag) => post_tag.tag)}
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
              thumbnailUrl={post.thumbnail?.url ?? ''}
              tags={post.tags.map((post_tag) => post_tag.tag)}
              containerClassName="flex-grid"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
