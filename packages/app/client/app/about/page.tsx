"use client";

import Image from "next/image";
import profileImage from "@/asset/profile.jpeg";
import Tag from "@my-own-blog/core/components/Tag";
import newLineIcon from "@/asset/newline.svg";
import Reply from "@/components/Reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Stack from "@/components/Stack";

export default function Page() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="flex justify-center w-full py-24"
      style={{ background: "#f7f2f2" }}
    >
      <div className="p-2 grid gap-2 sm:grid-cols-2 flex-1 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm overflow-scroll">
        <GridItem span="1 1">
          <div
            className="relative w-max mb-2"
            style={{ width: 180, height: 180 }}
          >
            <div
              className="absolute top-2 right-2 z-10 rounded-md bg-green-300 w-6 text-center cursor-pointer"
              title="ㅎㅇㅎㅎㅇ"
              onClick={() => {
                setFlipped((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faRepeat} />
            </div>
            <motion.div
              className="mb-3 absolute top-0 left-0"
              animate={{
                rotateY: flipped ? 180 : 0,
              }}
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <Image src={profileImage} alt="profile" className="rounded-md" />
            </motion.div>
            <motion.div
              animate={{
                rotateY: flipped ? 0 : 180,
              }}
              className="mb-3 absolute top-0 left-0 "
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                alt="profile"
                src="https://github.com/KimWash.png"
                width={180}
                height={180}
                className="rounded-md"
              />
            </motion.div>
          </div>
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
                <a href="https://instagram.com/appbug_developer">개발 계정</a> /{" "}
                <a href="https://instagram.com/gan_ggan_ggang">개인 계정</a>
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
        <GridItem span="2 1">
          <h2>저는요..</h2>
          <ul className="list-disc list-inside">
            <li>
              틀에 박힌 사고를 멀리하고 항상 새로운 생각을 하려고 합니다.
              <Reply>
                틀에 갇히지 말되 기틀을 다지는 것은 중요하다고 생각합니다.
              </Reply>
            </li>
            <li>
              머릿속이 복잡할 땐 돌아올 곳을 만들어 둔 다음 우선 달려들고 보는
              타입입니다.
              <Reply>
                가끔 다치기도 하지만, 그 부상이 성장을 위한 포석이라고 생각하는
                편입니다.
              </Reply>
            </li>
            <li>
              일은 결국 사람이 하는 것이고 사람과 하는 것이라고 생각합니다.
              <ul className="list-inside ml-3">
                <li>
                  <FontAwesomeIcon icon={faAdd} className="mr-3" />
                  열정 있는 동료, 배려할 줄 아는 동료가 있는 환경에서 영향을
                  주고 받으며 함께 성장하고 싶습니다.
                </li>
              </ul>
            </li>
          </ul>
        </GridItem>
        <GridItem span="1 1">
          <h2>학력</h2>
          <ul className="list-disc list-inside">
            <li>인천대학교 컴퓨터공학부 학사 2학년 휴학 (2022.03 ~ )</li>
          </ul>
        </GridItem>
        <GridItem span="1 1">
          <h2>경력/활동</h2>
          <ul className="list-disc list-inside">
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
        <GridItem span="1 1">
          <h2>기술스택</h2>
          <div className="leading-10 mb-3">
            <div>
              <Tag color="#f14668">Level 1</Tag> 코드를 읽고 수정할 수 있어요
            </div>
            <div>
              <Tag color="#ffe08a" fontColor="black">Level 2</Tag> 어느정도 프로젝트를 수행할 수
              있어요
            </div>
            <div>
              <Tag color="#48c78e">Level 3</Tag> 많이 사용해봐서 자신있어요
            </div>
          </div>
          <h3>Frontend</h3>
          <div className="flex flex-wrap gap-1 mb-3">
            <Stack level={3}>JS</Stack>
            <Stack level={3}>React</Stack>
            <Stack level={1}>Vue.js</Stack>
            <Stack level={3}>HTML/CSS</Stack>
            <Stack level={3}>TS</Stack>
            <Stack level={2}>JQuery</Stack>
            <Stack level={1}>Buefy</Stack>
            <Stack level={2}>Tailwind</Stack>
          </div>
          <h3>Backend</h3>
          <div className="flex flex-wrap gap-1 mb-3">
            <Stack level={1}>Express.js</Stack>
            <Stack level={1}>Spring Boot</Stack>
          </div>
          <h3>App</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            <Stack level={2}>React Native</Stack>
            <Stack level={2}>Koltin Android</Stack>
            <Stack level={2}>Flutter</Stack>
          </div>
        </GridItem>
        <GridItem span="1 1">
          <h2>프로젝트</h2>
        </GridItem>
      </div>
    </div>
  );
}
export type TailwindSize = "sm" | "md" | "lg" | "xl" | `${number}xl`;

function GridItem({
  span = "1 1",
  className,
  children,
}: React.PropsWithChildren<{
  span?: `${number} ${number}`;
  className?: string;
}>) {
  const spans = span.split(" ");
  return (
    <div
      className={`bg-white rounded-3xl p-6 flex-1 ${className}`}
      style={{
        gridColumn: `span ${spans[0]} / span ${spans[1]}`,
      }}
    >
      {children}
    </div>
  );
}
