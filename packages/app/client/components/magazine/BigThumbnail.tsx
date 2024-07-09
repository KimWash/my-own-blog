import Image from "next/image";
import { PostCardProps } from "../PostCard";
import placeHolderImage from "@/asset/placeholder.png";
import classNames from "classnames";
import "@my-own-blog/core/lib/date/date.extensions";
import Link from "next/link";

export default function BigThumbnail({
  id,
  title,
  description,
  thumbnailUrl,
  className,
  create_dt,
}: {
  id: number;
  title: string;
  description: string;
  thumbnailUrl?: string;
  className?: string;
  create_dt: Date;
}) {
  const blurDataURL = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';
  return (
    <div
      className={classNames([
        "flex flex-1 flex-col gap-4 cursor-pointer group",
        className,
      ])}
    >
      <Link href={`/magazine/post/${id}`} className="h-full">
        <Image
          src={thumbnailUrl ?? placeHolderImage}
          alt="alt"
          width={588}
          height={357}
          className="aspect-square w-full"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
        <div className=" text-black text-[32px] font-bold group-hover:underline">
          {title}
        </div>
        <div className=" text-black text-xl font-normal">{description}</div>
        <div className=" text-black text-xl font-normal">
          {create_dt.format("yyyy-MM-dd")}
        </div>
      </Link>
    </div>
  );
}
