import SidebarMenu from "./SidebarMenu";
import Link from "next/link";
import getMenus from "../hooks/useMenu";

export default async function Header() {
  const menuQuery = await getMenus();
  return (
    <div className="w-full px-10 py-8 justify-between items-center inline-flex bg-orange-50">
      <Link href="/magazine">
      <div className="text-black text-4xl font-bold">
        draft
      </div>
      </Link>
      {
        <SidebarMenu
        title={<div className="w-full"></div>}
          menus={menuQuery.filter(menu => menu.type === 'magazine')}
          backgroundColor="#FFF7ED"
        />
      }
      
    </div>
  );
}
