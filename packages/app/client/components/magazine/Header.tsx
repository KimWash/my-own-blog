import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarMenu from "./SidebarMenu";
import menus from "@/asset/menus_temp.json";
import { MenuItem } from "@my-own-blog/core/types/Menu";
import Link from "next/link";
import MenuService from "@my-own-blog/core/service/MenuService"

export default async function Header() {
  const menus = await MenuService.getMenus();
  return (
    <div className="w-full px-10 py-8 justify-between items-center inline-flex">
      <Link href="/magazine">
      <div className="text-black text-4xl font-bold font-['NanumMyeongjo']">
        draft
      </div>
      </Link>
      <SidebarMenu
      title={<div className="w-full"></div>}
        menus={menus.filter(menu => menu.type === 'magazine')}
        backgroundColor="#FFF7ED"
      />
    </div>
  );
}
