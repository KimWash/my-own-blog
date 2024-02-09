import { Post } from "@/api/model/Post";
import Tag from "./Tag";
import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";
import Link from "next/link";

export type PostCardProps = Post & {
  containerStyle?: {};
  containerClassName?: string;
};

export default function PostCard({
  id,
  title,
  date,
  description,
  tags,
  thumbnailUrl,
  containerStyle,
  containerClassName,
}: PostCardProps) {
  return (
    <div
      className={`flex flex-col justify-end w-full overflow-hidden post-card ${containerClassName}`}
      style={containerStyle}
    >
      <Link href={`/post/${id}`}>
        <div className="relative">
          <Image
            draggable={false}
            src={thumbnailUrl ?? placeHolderImage}
            alt="placeholder"
            width={300}
            height={200}
            className="w-full aspect-video opacity-100 object-cover image-box"
          />
          <div className="bg-black absolute w-full h-full opacity-30 top-0"></div>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 w-full p-4">
            <div className="flex flex-row justify-between items-end gap-2">
              <p className="text-white">{title}</p>
              <p className="text-nowrap text-white">
                {date.format("yyyy-MM-dd")}
              </p>
            </div>
            <hr className="border-white" />
            <div className="flex flex-row justify-between items-center gap-1 pt-1">
              <p className="text-ellipsis text-nowrap overflow-hidden text-white">
                {description}
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
