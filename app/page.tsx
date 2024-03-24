import FeaturedBanner from "@/components/FeaturedBanner";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import db from "db";

const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export default async function Home() {
  const posts = await db.post.findMany({
    include: { tags: { include: { tag: true } } },
  });
  return (
    <main className="flex flex-col">
      <FeaturedBanner
        no={posts[0].id}
        key={posts[0].id}
        {...posts[0]}
        thumbnailUrl=""
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
              thumbnailUrl=""
              tags={post.tags.map((post_tag) => post_tag.tag)}
              containerClassName="flex-grid"

            />
          ))}
    
        </div>
      </div>
    </main>
  );
}
