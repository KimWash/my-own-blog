import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";
import { Post } from "@/api/model/Post";
import Link from "next/link";
import Tag from "./Tag";

export type FeaturedBannerProps = Post & { no: number };

export default function FeaturedBanner({
  id,
  thumbnailUrl,
  title = "사지방에서 코딩하기 - VSCode Tunneling",
  description = "본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림",
  date = new Date(),
  no = 1,
  tags = [],
}: FeaturedBannerProps) {
  return (
    <div className="p-5">
      <Link href={`/post/${id}`}>
        <h1 className="font-bold text-3xl pb-2">Featured #{no}</h1>
        <div className="flex flex-row">
          <Image
            width={200}
            height={180}
            className="hover-animation"
            src={thumbnailUrl ?? placeHolderImage}
            alt="Thumbnail Image"
          ></Image>
          <div className="px-4 flex flex-col justify-between ">
            <div className="hover:underline">
              <h2 className="font-bold text-2xl">{title}</h2>
              <h4>{description}</h4>
            </div>
            <div className="flex flex-row justify-between items-center gap-1 pt-1">
              <p className="text-ellipsis text-nowrap overflow-hidden">
                {date.format("yyyy년 MM월 dd일")} 게시
              </p>
              {tags.map((tag) => (
                <Tag size="sm" key={tag} color="lightgreen">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}