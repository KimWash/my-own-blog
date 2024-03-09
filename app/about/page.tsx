"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import FullScreen from "@/components/FullScreen";
import PanelItem from "@/components/PanelItem";

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [one, two, three] = [
    useTransform(scrollYProgress, [0.3, 1], [0, 1]),
    useTransform(scrollYProgress, [0.5, 1], [0, 1]),
    useTransform(scrollYProgress, [0.7, 1], [0, 1]),
  ];
  const whiteToBlack = useTransform(
    scrollYProgress,
    [0.1, 1],
    ["#fff", "#000"]
  );
  const blackToWhite = useTransform(
    scrollYProgress,
    [0.1, 1],
    ["#000", "#fff"]
  );

  return (
    <FullScreen.Container ref={containerRef}>
      <FullScreen.Page style={{ backgroundColor: whiteToBlack }}>
        <div className="flex flex-row items-center gap-6">
          <Image
            src="https://github.com/KimWash.png"
            alt="image"
            width={200}
            height={200}
            objectFit="cover"
            className="aspect-square object-cover rounded-full "
          />

          <p className="text-4xl leading-relaxed">
            안녕하세요,
            <br />
            이상할 정도로 성장에 진심인{" "}
            <span className="font-bold">최경민</span>
            입니다.
          </p>
          <motion.div
            transition={{
              translateY: {
                duration: 1.2,
                yoyo: Infinity,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
            style={{ color: blackToWhite }}
            animate={{ translateY: ["5px", "-5px"] }}
            className="absolute left-1/2 right-1/2 bottom-10"
          >
            <FontAwesomeIcon icon={faChevronDown} size="2xl" />
          </motion.div>
        </div>
      </FullScreen.Page>
      <FullScreen.Page style={{ background: whiteToBlack }}>
        <div className="flex-1 flex flex-wrap flex-row p-3 gap-3">
          <PanelItem style={{ scale: three }}>
            인천대학교
            <br />
            2학년
            <br />
            휴학중
          </PanelItem>
          <PanelItem style={{ scale: two }}>
            인천대학교
            <br />
            2학년
            <br />
            휴학중
          </PanelItem>
          <PanelItem style={{ scale: one }}>
            인천대학교
            <br />
            2학년
            <br />
            휴학중
          </PanelItem>
          <PanelItem style={{ scale: scrollYProgress }}>
            인천대학교
            <br />
            2학년
            <br />
            휴학중
          </PanelItem>
        </div>
      </FullScreen.Page>
    </FullScreen.Container>
  );
}
