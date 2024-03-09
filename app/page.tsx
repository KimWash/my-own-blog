import FeaturedBanner from "@/components/FeaturedBanner";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

const generateRandomString = (length: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};


export default function Home() {
  return (
    <main className="flex flex-col">
      <div >
        <FeaturedBanner
          title="사지방에서 코딩하기 - VSCode Tunneling"
          description="본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림"
          date={new Date()}
          id={1}
          no={1}
          tags={["코딩"]}
          thumbnailUrl="https://picsum.photos/seed/picsum/400/280"
        />
        <div
          className="flex flex-row flex-wrap w-full relative"
          style={{ flexFlow: "row wrap" }}
        >
          {Array(6)
            .fill(1)
            .map((_, i) => (
              <PostCard
                key={i}
                id={i}
                title="사지방에서 코딩하기 - VSCode Tunneling"
                description="본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림"
                date={new Date()}
                tags={["코딩"]}
                thumbnailUrl={`https://picsum.photos/seed/${generateRandomString(
                  10
                )}/400/280`}
                containerClassName="flex-grid"
              />
            ))}
        </div>
      </div>
    </main>
  );
}
