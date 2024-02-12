"use client";

import usePlatform from "@/lib/usePlatform";
import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import FullScreenSearch from "./FullScreenSearch";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [isFullScreenSearch, setIsFullScreenSearch] = useState(false);
  const { isMobile } = usePlatform();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const search = (query: string) => router.push("/search?query=" + query);

  return (
    <div>
      {isFullScreenSearch && (
        <FullScreenSearch
          onClose={() => setIsFullScreenSearch(false)}
          keyword={keyword}
          onChangeKeyword={setKeyword}
          onSearch={() => search(keyword)}
        />
      )}
      <div
        className={`search-area flex flex-row justify-start items-center gap-2 `}
      >
        <div className="search-box flex items-center p-1 pl-3 pr-2 rounded-full">
          <input
            placeholder="무엇을 검색해볼까요.."
            className="search-field outline-none"
            name="query"
            value={keyword}
            onChange={({ target }) => setKeyword(target.value)}
          ></input>
          <FontAwesomeIcon
            icon={faSearch}
            size="lg"
            onClick={() => {
              if (isMobile && !isFullScreenSearch) setIsFullScreenSearch(true);
              else search(keyword);
            }}
          />
        </div>
      </div>
    </div>
  );
}
