import Image from "next/image";
import { PostCardProps } from "./PostCard";
import placeHolderImage from "@/asset/placeholder.png";
import classNames from "classNames";
import "@my-own-blog/core/lib/date/date.extensions"

export default function BigThumbnail({
  title,
  description,
  thumbnailUrl,
  className,
  create_dt
}: {
  title: string;
  description: string;
  thumbnailUrl?: string;
  className?: string;
  create_dt: Date;
}) {
  return (
    <div
      className={classNames([
        "flex flex-1 flex-col gap-4 cursor-pointer group",
        className,
      ])}
    >
      <Image
        src={thumbnailUrl ?? placeHolderImage}
        alt="alt"
        width={588}
        height={357}
      />
      <div className=" text-black text-[32px] font-bold group-hover:underline">
        {title}
      </div>
      <div className=" text-black text-xl font-normal">{description}</div>
      <div className=" text-black text-xl font-normal">{create_dt.format("yyyy-MM-dd")}</div>
    </div>
  );
}
