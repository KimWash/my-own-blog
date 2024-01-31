import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";

export interface BannerProps {
  thumbnailUrl?: string;
  title: string;
  description?: string;
  registrationDate: Date;
}

export type FeaturedBannerProps = BannerProps & { no: number };

export default function FeaturedBanner({
  thumbnailUrl,
  title = "사지방에서 코딩하기 - VSCode Tunneling",
  description = "본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림",
  registrationDate = new Date(),
  no = 1,
}: FeaturedBannerProps) {
  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl">Featured #{no}</h1>
      <div className="flex flex-row">
        <Image
          height={180}
          src={thumbnailUrl ?? placeHolderImage}
          alt="Thumbnail Image"
        ></Image>
        <div className="px-4 flex flex-col justify-between">
          <div>
            <h2 className="font-bold text-2xl">{title}</h2>
            <h4>{description}</h4>
          </div>
          <p>{registrationDate.format('yyyy-MM-dd hh:mm')}</p>
        </div>
      </div>
    </div>
  );
}
