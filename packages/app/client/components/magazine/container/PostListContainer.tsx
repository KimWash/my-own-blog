"use client";

import usePage from '@my-own-blog/core/lib/usePage';
import useSearchViewModel from "../../hooks/useSearchViewModel";
import Image from 'next/image';
import placeHolderImage from "@/asset/placeholder.png";
import "@my-own-blog/core/lib/date/date.extensions"
import Tag from '@my-own-blog/core/components/Tag';


export default function PostListContainer({ category  }: { category?: string }) {
  const page = usePage();
  const { data, isLoading } = useSearchViewModel({ page, type: 'magazine', category });
  if (!data || isLoading) return "loading...";
  return (
    <main className="flex flex-col p-10 bg-orange-50 flex-1">
      {data.map((post) => (
        <div
          key={post.id}
          className="flex flex-row mb-3 gap-4 flex-wrap md:flex-nowrap"
        >
          <Image
            src={post.thumbnailUrl ?? placeHolderImage}
            width={300}
            height={100}
            className="aspect-square md:aspect-video object-cover w-full md:w-[300px]"
            alt="글 이미지"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-4xl font-bold">{post.title}</p>
              <p className="text-xl">{post.description}</p>
              <div>
              {post.tags.map((tag) => (
             `#${tag.name} `
              ))}
            </div>
            </div>
        
            <p>{post.create_dt?.format('yyyy-MM-dd')}</p>
          </div>

        </div>
      ))}
    </main>
  )
}
