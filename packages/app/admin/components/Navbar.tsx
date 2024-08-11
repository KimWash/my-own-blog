import { PropsWithChildren } from "react";
import Link from "next/link";
import MenuService from "@my-own-blog/core/service/MenuService";

type MenuItem = {
  id: string;
  name: string;
  type: string;
  url: string;
  children: MenuItem[];
};

export default async function Navbar(props: PropsWithChildren) {
  const groupedCategories = await MenuService.getMenus();
  const post_menus = groupedCategories;
  const rootMenus = [
    {
      id: "post",
      name: "글 관리",
      type: "table",
      url: "/post",
      children: post_menus,
    },
  ] as MenuItem[];
  const menuElements = (menus: typeof rootMenus) =>
    menus.map((menu) =>
      menu.children.length > 0 ? (
        <li key={menu.id}>
          <details>
            <summary>{menu.name}</summary>
            <ul>
              {menuElements(
                menu.children.map((childMenu) => ({
                  ...childMenu,
                  url: `${menu.url}/${childMenu.id}`,
                }))
              )}
            </ul>
          </details>
        </li>
      ) : (
        <li key={menu.id}>
          <Link href={'/dashboard' + menu.url}>{menu.name}</Link>
        </li>
      )
    );
  return (
    <div className="drawer h-full">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-full">
        {/* Navbar */}
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <Link href="/">my-own-blog 관리도구</Link>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">{menuElements(rootMenus)}</ul>
          </div>
        </div>
        {props.children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          {menuElements(rootMenus)}
        </ul>
      </div>
    </div>
  );
}
