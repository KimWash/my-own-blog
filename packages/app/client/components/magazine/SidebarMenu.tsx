"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import type { MenuItem } from "@my-own-blog/core/types/Menu";

export default function SidebarMenu({
  backgroundColor,
  menus,
  title,
}: {
  backgroundColor: string;
  menus: MenuItem[];
  title?: React.ReactNode;
}) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const onOpen = () => setSidebarOpened(true);
  const onClose = () => setSidebarOpened(false);
  const sidebarRef = useRef(null);

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        onClick={onOpen}
        className="cursor-pointer"
      />

      <CSSTransition
        in={sidebarOpened}
        timeout={200}
        nodeRef={sidebarRef}
        classNames="animated-sidebar"
        mountOnEnter
        unmountOnExit
      >
        <div
          className="fixed left-0 top-0 right-0 bottom-0 z-20 bg-gray-400 bg-opacity-50 flex justify-end"
          onClick={({ target, currentTarget }) => {
            if (target === currentTarget) onClose();
          }}
        >
          <div
            ref={sidebarRef}
            className="w-80 h-full bg-white p-4 sidebar-content"
            style={{ background: backgroundColor }}
          >
            <div className="flex justify-between items-center">
              {title}
              <FontAwesomeIcon
                icon={faClose}
                size="2xl"
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>
            <ul className="sidebar-menu ">
              {menus.map((menu) => (
                <li key={menu.id} className="mb-8">
                  <Link
                    href={menu.id}
                    onClick={() => {
                      setSidebarOpened(false);
                    }}
                  >
                    <div className="text-black text-4xl font-normal font-['NanumMyeongjo'] hover:underline ">
                      {menu.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
