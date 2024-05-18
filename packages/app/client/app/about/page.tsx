"use client";

import RoundedButton from "@/components/RoundedButton";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { get } from "http";
import Image from "next/image";
import profileImage from "@/asset/profile.jpeg";
import Tag from "@my-own-blog/core/components/Tag";

export default function Page() {
  return (
    <div
      className="flex justify-center items-center w-full h-full"
      style={{ background: "#f7f2f2" }}
    >
      <div className="p-2 grid gap-2 sm:grid-cols-2 flex-1 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm">
        <GridItem span="1 1">
          <Image src={profileImage} alt="profile" />
          <h1>안녕하세요!</h1>
          <p>
            <span>저는 음악과 사진을 좋아하는 낭만추구형 개발자 </span>
            <span className="font-bold text-nowrap">최경민 </span>
            <span>입니다.</span>
          </p>
          <p>
            <span>현재 군복무중입니다 🫡</span>
          </p>
        </GridItem>
        <GridItem span="1 1">
          <h1>연락하기</h1>
          <div className="mt-6 mb-3">
            <ul>
              <li className="mb-2">
                <Tag className="inline">Email</Tag>{" "}
                <a href="mailto:ckm0728wash@gmail.com">ckm0728wash@gmail.com</a>
              </li>
              <li className="mb-2">
                <Tag className="inline">Github</Tag>{" "}
                <a href="https://github.com/KimWash">
                  https://github.com/KimWash
                </a>
              </li>
              <li className="mb-2">
                <Tag className="inline">Instagram</Tag>{" "}
                <a href="https://instagram.com/appbug_developer">
                개발 계정
                </a> / <a href="https://instagram.com/gan_ggan_ggang">
                개인 계정
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="flex flex-row justify-between items-center">
            <RoundedButton
              onClick={async () => {
                get("/api/post");
              }}
              radius="3xl"
            >
              더 읽어보기 <FontAwesomeIcon icon={faArrowCircleRight} />
            </RoundedButton>
            <p>2024.03.31</p>
          </div> */}
        </GridItem>
        <GridItem span="2 1" >
          <h1>저는요..</h1>
          <p>틀에 박힌 사고를 멀리하고 항상 새로운 생각을 하려고 합니다. 틀에 갇히지 말되 기틀을 다지는 것은 중요하다고 생각합니다.</p>
          <p>머릿속이 복잡할 땐 돌아올 곳은 만들어 두고 우선 달려들고 보는 타입입니다. 가끔 다치기도 하지만, 그 부상이 성장을 위한 포석이라고 생각하는 편입니다.</p>
          <p>일은 결국 사람이 하는 것이고 사람과 하는 것이라고 생각합니다. 열정 있는 동료, 배려할 줄 아는 동료가 있는 환경에서 영향을 주고 받으며 함께 성장하고 싶습니다.</p>
        </GridItem>
        <GridItem span="1 1">
          <h1>학력</h1>
          <ul>
            <li>인천대학교 컴퓨터공학부 학사 2학년 휴학 (2022.03 ~ )</li>
          </ul>
        </GridItem>
        <GridItem span="1 1">
          <h1>경력/활동</h1>
          <ul>
            <li>
              <a href="https://cozyllc.co.kr">COZY (2020.03 ~ 2023.12)</a>
            </li>
            <li>
              <a href="https://home.inuappcenter.kr">
                인천대학교 글로벌 앱센터 (2022.04 ~ )
              </a>
            </li>
            <li>
              <a href="https://moberan.com">모베란 인턴 (2022.09 ~ 2023.11)</a>
            </li>
            <li>대한민국 육군 (2023.12 ~ 2025.06) 🫡</li>
          </ul>
        </GridItem>
        <GridItem span="1 1" />
        <GridItem span="1 1" />
      </div>
    </div>
  );
}
export type TailwindSize = "sm" | "md" | "lg" | "xl" | `${number}xl`;

function GridItem({
  span = "1 1",
  children,
}: React.PropsWithChildren<{ span?: `${number} ${number}` }>) {
  const spans = span.split(" ");
  return (
    <div
      className="bg-white rounded-3xl p-6 flex-1 "
      style={{
        gridColumn: `span ${spans[0]} / span ${spans[1]}`,
      }}
    >
      {children}
    </div>
  );
}
