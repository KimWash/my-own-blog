"use client";

import RoundedButton from "@/components/RoundedButton";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from "@db/prisma";
import { get } from "http";

export default function Page() {
  return (
    <div
      className="flex justify-center items-center w-full h-full"
      style={{ background: "#f7f2f2" }}
    >
      <div className="p-2 grid gap-2 sm:grid-cols-2 flex-1 xl:max-w-screen-xl md:max-w-screen-md sm:max-w-screen-sm">
        <GridItem span="1 1">
          <h1>안녕하세요!</h1>
          {`
          I'm rob, a web developer from Italy. I'm interested in Code, Design,
          Business, Crypto, Startups and Marketing.`}
        </GridItem>
        <GridItem span="1 1">
          <h1>읽어볼만한 것</h1>
          <p className="mt-6 mb-3">
            {`
            How it started vs. how it's going A short personal history as it
            relates to design and development, and how I've found value in the
            cross-section between both disciplines.
            `}
          </p>
          <div className="flex flex-row justify-between items-center">
            <RoundedButton
              onClick={async () => {
                get('/api/post')
              }}
              radius="3xl"
            >
              더 읽어보기 <FontAwesomeIcon icon={faArrowCircleRight} />
            </RoundedButton>
            <p>2024.03.31</p>
          </div>
        </GridItem>
        <GridItem span="2 1" />
        <GridItem span="1 1" />
        <GridItem span="1 1" />
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
