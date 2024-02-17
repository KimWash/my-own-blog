"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="flex justify-center items-center h-full">
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
          이상할 정도로 성장에 진심인 <span className="font-bold">최경민</span>
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
          animate={{ translateY: ["5px", "-5px"] }}
          className="absolute left-1/2 right-1/2 bottom-10"
        >
          <FontAwesomeIcon icon={faChevronDown} size="2xl" />
        </motion.div>
      </div>
    </div>
    // <div className="flex flex-col">
    //   <div className="flex flex-row">

    //   </div>
    // </div>
  );
}
