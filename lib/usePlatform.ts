"use client";

import { useMemo } from "react";
import UAParser from "ua-parser-js";
import useViewPortSize from "./useViewPortSize";

export default function usePlatform() {
  const ua = useMemo(
    () =>
      typeof window !== "undefined"
        ? new UAParser(window.navigator.userAgent).getResult()
        : undefined,
    []
  );

  /**
   * 기존에 isMobile 함수였지만, user-agent 기반으로 플랫폼 구분을 하게 되면
   * 변동되는 viewport 크기가 아닌 페이지를 로드할때
   * 설정 된 user-agent를 기반으로 조정하게 됨
   */
  const isMobileUA = useMemo(
    () =>
      ua !== undefined
        ? ua.device.type === "mobile" ||
          ua.device.type === "tablet" ||
          ua.os.name === "Android" ||
          ua.os.name === "iOS"
        : undefined,
    [ua]
  );

  const viewPortSize = useViewPortSize();
  const isMobile = useMemo(
    () => (viewPortSize.width ?? 0) <= 768,
    [viewPortSize]
  );

  return {
    ua,
    isMobile,
  };
}
