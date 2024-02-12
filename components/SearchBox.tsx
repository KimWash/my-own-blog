"use client";

import usePlatform from "@/lib/usePlatform";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function SearchBox() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isFullScreenSearch, setIsFullScreenSearch] = useState(false);
  const { isMobile } = usePlatform();

  return (
    <form action="/search" ref={formRef}>
      <div
        className={`search-area flex flex-row justify-start items-center gap-2 ${
          isFullScreenSearch ? "opened" : ""
        }`}
      >
        <div className="search-box flex items-center relative p-1 pl-3 pr-2 rounded-full">
          <input
            placeholder="무엇을 검색해볼까요.."
            className="search-field outline-none w-0"
            name="query"
          ></input>
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            onClick={() => {
              if (isMobile && !isFullScreenSearch) setIsFullScreenSearch(true);
              else formRef.current?.submit();
            }}
          />
        </div>
        <FontAwesomeIcon
          className="search-close"
          icon={faClose}
          size="xl"
          onClick={() => setIsFullScreenSearch(false)}
        />
      </div>
    </form>
  );
}
