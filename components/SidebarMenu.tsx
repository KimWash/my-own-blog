"use client";

import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import menus from "@/asset/menus_temp.json";
import Link from "next/link";

export default function SidebarMenu() {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const onOpen = () => setSidebarOpened(true);
  const onClose = () => setSidebarOpened(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        size="xl"
        onClick={onOpen}
        className="cursor-pointer"
      />
      {sidebarOpened && (
        <div
          className="fixed left-0 top-0 right-0 bottom-0 z-20 bg-gray-400 bg-opacity-50 flex justify-end"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="w-80 h-full bg-white p-4">
            <div className="flex justify-between items-center">
              <p className="text-xl font-extrabold">Wh@t !s development?</p>
              <FontAwesomeIcon
                icon={faClose}
                size="2xl"
                onClick={onClose}
                className="cursor-pointer"
              />
            </div>
            <ul className="sidebar-menu">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Me</Link>
              </li>
              {menus.map((menu) => (
                <li key={menu.id}>
                  <Link href={menu.id}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
