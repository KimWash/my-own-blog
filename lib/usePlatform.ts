"use client";

import { useMemo } from "react";
import UAParser from "ua-parser-js";

export default function usePlatform() {
  const ua = useMemo(
    () => typeof window !== 'undefined' ? new UAParser(window.navigator.userAgent).getResult() : undefined,
    []
  );

  const isMobile = useMemo(
    () =>
      ua !== undefined ? ua.device.type === "mobile" ||
      ua.device.type === "tablet" ||
      ua.os.name === "Android" ||
      ua.os.name === "iOS": undefined,
    [ua]
  );

  return {
    ua,
    isMobile,
  };
}
