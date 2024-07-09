'use client';

import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import useMenu from "../hooks/useMenu";

export default function Header() {
  const menuQuery = useMenu();
  return (
    <div className="w-full px-10 py-8 justify-between items-center inline-flex bg-orange-50">
      <Link href="/magazine">
      <div className="text-black text-4xl font-bold">
        draft
      </div>
      </Link>
      {
        !menuQuery.isLoading && menuQuery.data && 
        <SidebarMenu
        title={<div className="w-full"></div>}
          menus={menuQuery.data.filter(menu => menu.type === 'magazine')}
          backgroundColor="#FFF7ED"
        />
      }
      
    </div>
  );
}
