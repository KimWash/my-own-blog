"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { useRouter } from "next/navigation";
import usePlatform from "@/lib/usePlatform";
import { FormEvent, useRef, useState } from "react";
import FullScreenSearch from "./FullScreenSearch";

export default function Header() {
  const router = useRouter();
  const { isMobile } = usePlatform();

  const search = (query: string) => router.push("/search?query=" + query);

  /**
   * Todo: handleSubmit이 모바일인 경우 submit을 검색 버튼 클릭으로 간주하고
   * 검색영역 확대를 시행하는 것 자체가 SRP 위반.
   * 따라서 어차피 server component가 아닌 client component로 관리할 것이라면
   * 그냥 form submit 이벤트와 구분하자~
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new FormData(e.currentTarget).get("query")?.toString();
    if (!isMobile && query) search(query);
    else {
      if (isFullScreenSearch)
        if (query) search(query);
        else alert("검색어를 입력하세요.");
      else setIsFullScreenSearch(true);
    }
  };

  const [isFullScreenSearch, setIsFullScreenSearch] = useState(false);
  return (
    <div
      className="flex justify-between items-center p-4 border-b-gray-300"
      style={{ borderBottomWidth: 1 }}
    >
      <Link href="/" className="font-extrabold text-xl">
        Wh@t !s development?
      </Link>
      <div className="flex gap-4 items-center">
        <form onSubmit={handleSubmit}>
          {isFullScreenSearch && (
            <FullScreenSearch onClose={() => setIsFullScreenSearch(false)} />
          )}

          <div className="search-area flex flex-row justify-start items-center gap-2">
            <div className="search-box flex items-center relative p-1 pl-3 pr-2 rounded-full">
              <input
                placeholder="무엇을 검색해볼까요.."
                className="search-field outline-none w-0"
                name="query"
              ></input>
              <button type="submit" className="search-icon">
                <FontAwesomeIcon icon={faSearch} size="lg" />
              </button>
            </div>
          </div>
        </form>
        <SidebarMenu />
      </div>
    </div>
  );
}
