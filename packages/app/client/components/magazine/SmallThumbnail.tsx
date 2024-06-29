import Image from "next/image";
import "@my-own-blog/core/lib/date/date.extensions";
import classNames from "classnames";
import placeHolderImage from "@/asset/placeholder.png";
import Link from "next/link";

export default function SmallThumbnail({
  id,
  title,
  description,
  thumbnailUrl,
  create_dt,
  className,
}: {
  id: number;
  title: string;
  description: string;
  thumbnailUrl?: string;
  create_dt: Date;
  className?: string;
}) {
  return (
    <div className={classNames(["flex flex-col flex-1 h-full ", className])}>
      <div className="md:h-[54%] aspect-[3/4]  ">
        <Link className="h-full flex flex-col justify-start gap-4 cursor-pointer group" href={`/magazine/post/${id}`}>
          <div className="relative h-full aspect-square">
            <Image
              src={thumbnailUrl ?? placeHolderImage}
              alt="alt"
              fill
              className="aspect-video object-cover"
            />
          </div>
          <div className=" text-black text-xl font-bold group-hover:underline">
            {title}
          </div>
          <div className=" text-black text-[15px] font-normal">
            {description}
          </div>
          <div className=" text-black text-[15px] font-normal">
            {create_dt.format("yyyy-MM-dd")}
          </div>
        </Link>
      </div>
    </div>
  );
}
