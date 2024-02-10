"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { useRouter } from "next/navigation";
import usePlatform from "@/lib/usePlatform";
import { FormEvent, useRef } from "react";

export default function Header() {
  const router = useRouter();
  const { isMobile } = usePlatform();

  const onSearchButtonClicked = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isMobile)
      router.push(
        "/search?query=" + new FormData(e.currentTarget).get("query")
      );
    else {
      const searchBoxClassList = searchBoxRef.current?.classList;
      if (searchBoxClassList?.contains("opened"))
        searchBoxClassList?.remove("opened");
      else searchBoxClassList?.add("opened");
    }
  };

  const searchBoxRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex justify-between items-center p-4 border-b-gray-300"
      style={{ borderBottomWidth: 1 }}
    >
      <Link href="/" className="font-extrabold text-xl">
        Wh@t !s development?
      </Link>
      <div className="flex gap-4 items-center">
        <form onSubmit={onSearchButtonClicked}>
          <div
            ref={searchBoxRef}
            className="search-box flex items-center relative p-1 pl-3 pr-2 rounded-full"
          >
            <input
              placeholder="무엇을 검색해볼까요.."
              className="search-field w-0"
              name="query"
            ></input>
            <button type="submit" className="search-icon">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
            <FontAwesomeIcon
            className='search-close'
              icon={faClose}
              size="lg"
              onClick={() => {
                const searchBoxClassList = searchBoxRef.current?.classList;
                searchBoxClassList?.remove("opened");
              }}
            />
          </div>
        </form>
        <SidebarMenu />
      </div>
    </div>
  );
}
