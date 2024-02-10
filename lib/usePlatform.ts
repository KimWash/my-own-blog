"use client";

import { useMemo } from "react";
import UAParser from "ua-parser-js";

export default function usePlatform() {
  const ua = useMemo(
    () => new UAParser(window.navigator.userAgent).getResult(),
    []
  );

  const isMobile = useMemo(
    () =>
      ua.device.type === "mobile" ||
      ua.device.type === "tablet" ||
      ua.os.name === "Android" ||
      ua.os.name === "iOS",
    [ua.device.type, ua.os.name]
  );

  return {
    ua,
    isMobile,
  };
}
