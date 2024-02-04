import { Post } from "@/api/model/Post";
import Tag from "./Tag";
import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";

export default function PostCard({
  title,
  date,
  description,
  tags,
  thumbnailUrl,
}: Post) {
  return (
    <div className="flex flex-col justify-end relative w-full">
      <Image
        src={thumbnailUrl ?? placeHolderImage}
        alt="placeholder"
        className="w-full opacity-70 backdrop-brightness-50"
      />
      <div className="absolute bottom-0 w-full">
        <div className="flex flex-row justify-between">
          <p>{title}</p>
          <p>{date.format("yyyy-MM-dd HH:mm")}</p>
        </div>
        <hr className="border-black" />
        <div className="flex flex-row justify-between">
          <p>{description}</p>
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
        </div>
      </div>
    </div>
  );
}
