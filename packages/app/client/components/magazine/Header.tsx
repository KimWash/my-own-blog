import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarMenu from "../SidebarMenu";
import menus from "@/asset/menus_temp.json";
import { MenuItem } from "@my-own-blog/core/types/Menu";

export default function Header() {
  return (
    <div className="w-full px-10 py-8 justify-between items-center inline-flex">
      <div className="text-black text-4xl font-bold font-['NanumMyeongjo']">
        draft
      </div>
      <SidebarMenu
        title={<p className="text-xl font-extrabold">draft</p>}
        menus={menus as MenuItem[]}
        backgroundColor="#FFF7ED"
      />
    </div>
  );
}
