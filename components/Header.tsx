"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import SidebarDemo from "./SidebarDemo";

const SearchBox = dynamic(() => import("./SearchBox"), { ssr: false });

export default function Header() {
  const router = useRouter();


  /**
   * Todo: handleSubmit이 모바일인 경우 submit을 검색 버튼 클릭으로 간주하고
   * 검색영역 확대를 시행하는 것 자체가 SRP 위반.
   * 따라서 어차피 server component가 아닌 client component로 관리할 것이라면
   * 그냥 form submit 이벤트와 구분하자~
   */

  return (
    <div
      className="flex justify-between items-center p-4 border-b-gray-300"
      style={{ borderBottomWidth: 1 }}
    >
      <Link href="/" className="font-extrabold text-xl">
        Wh@t !s development?
      </Link>
      <div className="flex gap-4 items-center relative">
        <SearchBox />
        <SidebarMenu />
        {/* <SidebarDemo/> */}
      </div>
    </div>
  );
}
