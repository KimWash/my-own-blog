import Image from "next/image";
import placeHolderImage from "@/asset/placeholder.png";
import Tag from "@/components/Tag";

export default function AboutMe() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-3">
        <div>
          <Image
            src={placeHolderImage}
            alt="image"
            className="aspect-square object-cover rounded-3xl"
          />
        </div>
        <div>
          <p className="text-2xl py-3">
            안녕하세요,
            <br />
            이상할 정도로 성장에 진심인{" "}
            <span className="font-bold">최경민</span>입니다.
          </p>
          <div className="specs">
            <p>
              <Tag>Education</Tag>{" "}
              <a href="https://cse.inu.ac.kr/isis/index.do?epTicket=LOG">
                인천대학교 컴퓨터공학부 2학년 2022.03 ~ 재학중
              </a>
            </p>
            <p>
              <Tag>Organization</Tag>{" "}
              <a href="https://home.inuappcenter.kr/ourteam/android?year=2022">
                인천대학교 앱센터 14기 2022.04 ~
              </a>
            </p>
            <p>
              <Tag>Work at</Tag>{" "}
              <a href="https://moberan.com/">모베란 인턴 2022.09 ~</a>
            </p>
            <p>
              <Tag>Email</Tag>{" "}
              <a href="mailto:ckm0728wash@gmail.com"> ckm0728wash@gmail.com </a>
            </p>
            <p>
              <Tag>Github</Tag>{" "}
              <a href="https://github.com/KimWash">
                https://github.com/KimWash
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
