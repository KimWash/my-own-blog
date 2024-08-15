"use client";

import BigThumbnail from "../BigThumbnail";
import useHomeViewModel from "../../hooks/useHomeViewModel";
import usePage from "@my-own-blog/core/lib/usePage";
import SmallThumbnail from "../SmallThumbnail";
import { PostListDto } from "@my-own-blog/core/lib/model/Post";


const groupPosts = (posts: PostListDto[]) => {
  return posts.reduce((acc, curr, idx) => {
    const groupIndex = Math.trunc(idx / 3);
    if (acc[groupIndex]) acc[groupIndex].push(curr);
    else acc[groupIndex] = [curr];
    return acc;
  }, [] as PostListDto[][]);
};

const renderGroup = (posts: PostListDto[], index: number) => {
  const isEven = index % 2 === 0;
  const [firstPost, secondPost, thirdPost] = posts;

  return (
    <div key={firstPost.id} className="flex md:flex-row flex-col gap-4 mb-20">
      {isEven ? (
        <>
          <BigThumbnail
            {...{
              ...firstPost,
              description: firstPost.description!,
              create_dt: firstPost.create_dt!,
            }}
          />
          <div className="flex flex-row flex-1 gap-4">
            {secondPost && (
              <SmallThumbnail
                {...{
                  ...secondPost,
                  description: secondPost.description!,
                  create_dt: secondPost.create_dt!,
                }}
                className="md:justify-start"
              />
            )}
            {thirdPost && (
              <SmallThumbnail
                {...{
                  ...thirdPost,
                  description: thirdPost.description!,
                  create_dt: thirdPost.create_dt!,
                }}
                className="md:justify-end"
              />
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row flex-1 gap-4">
            {secondPost && (
              <SmallThumbnail
                {...{
                  ...secondPost,
                  description: secondPost.description!,
                  create_dt: secondPost.create_dt!,
                }}
              />
            )}
            {thirdPost && (
              <SmallThumbnail
                {...{
                  ...thirdPost,
                  description: thirdPost.description!,
                  create_dt: thirdPost.create_dt!,
                }}
                className="justify-end"
              />
            )}
          </div>
          <BigThumbnail
            {...{
              ...firstPost,
              description: firstPost.description!,
              create_dt: firstPost.create_dt!,
            }}
          />
        </>
      )}
    </div>
  );
};

export default function HomeContainer() {
  const page = usePage();
  const { data, isLoading } = useHomeViewModel(Number(page), 'magazine');
  if (!data || isLoading) return "loading...";

  const groupedPosts = groupPosts(data);

  return (
    <main className={`flex flex-col flex-1 p-10 bg-orange-50`}>
      <div className="text-black text-xl font-bold mb-4">
        당신이 읽어봤으면 하는 것들,
        <br />
        고봉밥처럼 눌러 담아봤어요.
      </div>
      <div >
      {groupedPosts.map((posts, index) => renderGroup(posts, index))}
      </div>
    </main>
  );
}
