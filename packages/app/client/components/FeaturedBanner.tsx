import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";
import { PostListDto } from '@my-own-blog/core/lib/model/Post';
import Link from "next/link";
import Tag from '@my-own-blog/core/components/Tag';
import '@my-own-blog/core/lib/date/date.extensions'

export type FeaturedBannerProps = PostListDto & { no: number };

export default function FeaturedBanner({
  id,
  thumbnailUrl,
  title = "사지방에서 코딩하기 - VSCode Tunneling",
  description = "본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림",
  create_dt = new Date(),
  no = 1,
  tags = [],
}: FeaturedBannerProps) {
  return (
    <div className="p-5">
      <Link href={`/dev/post/${id}`}>
        <h1 className="font-bold text-3xl pb-2">Featured #{no}</h1>
        <div className="flex flex-row">
          <Image
            width={100}
            height={100}
            priority
            className="hover-animation flex-1 max-w-64 aspect-square"
            src={thumbnailUrl ?? placeHolderImage}
            alt="Thumbnail Image"
          ></Image>
          <div className="px-4 flex flex-col justify-between ">
            <div className="hover:underline">
              <h2 className="font-bold text-2xl">{title}</h2>
              <h4>{description}</h4>
            </div>
            <div className="flex flex-row justify-between items-center gap-1 pt-1">
              <p className="text-ellipsis whitespace-nowrap overflow-hidden">
                {create_dt?.format("yyyy년 MM월 dd일")} 게시
              </p>
              {tags.map((tag) => (
                <Tag size="sm" key={tag.id} color="lightgreen" fontColor="black">
                  {tag.name}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
