import FeaturedBanner from "@/components/FeaturedBanner";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <FeaturedBanner
        title="사지방에서 코딩하기 - VSCode Tunneling"
        description="본업의 소중함을 알아버린 사람의 감을 잃지 않기 위한 몸부림"
        registrationDate={new Date()}
        no={1}
      />
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
