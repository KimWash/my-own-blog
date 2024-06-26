import Image from "next/image";
import "@my-own-blog/core/lib/date/date.extensions";
import classNames from "classnames";

export default function SmallThumbnail({
  title,
  description,
  thumbnailUrl,
  create_dt,
  className
}: {
  title: string;
  description: string;
  thumbnailUrl?: string;
  create_dt: Date;
  className?: string;

}) {
  return (
    <div className={classNames(["flex flex-col flex-1 justify-start gap-4 cursor-pointer group", className])}>
      <Image
        src="https://via.placeholder.com/293x178"
        alt="alt"
        width={293}
        height={178}
      />
      <div className=" text-black text-xl font-bold group-hover:underline">
        {title}
      </div>
      <div className=" text-black text-[15px] font-normal">
        {description}
      </div>
      <div className=" text-black text-[15px] font-normal">
        {create_dt.format("yyyy-MM-dd")}
      </div>
    </div>
  );
}
