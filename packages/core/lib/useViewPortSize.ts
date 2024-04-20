import { useState, useEffect } from "react";

type Size = {
  width?: number;
  height?: number;
}

/**
 * 현재 뷰포트의 크기를 반환하는 훅.
 * 꼭 dynamic 로드를 한 컴포넌트에서 이용하세요.
 * @returns {Size}
 */
export default function useViewPortSize() {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}
