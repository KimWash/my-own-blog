"use client";

import {
  faBars,
  faChevronDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import type { MenuItem } from "@my-own-blog/core/types/Menu";
import { motion } from "framer-motion";

export default function SidebarMenu({
  backgroundColor,
  menus,
  title,
}: {
  backgroundColor: string;
  menus: MenuItem[];
  title: React.ReactNode;
}) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const onOpen = () => setSidebarOpened(true);
  const onClose = () => setSidebarOpened(false);
  const sidebarRef = useRef(null);
  const [expandedMenu, setExpandedMenu] = useState<string>();
  const variants = {
    expanded: { scaleY: '100%', display:'block' },
    collapsed: {scaleY: 0, transitionEnd: {delay: 200, display:'none'}},
  };
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
            <ul className="sidebar-menu">
              <li>
                <Link
                  href="/dev"
                  onClick={() => {
                    setSidebarOpened(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dev/about"
                  onClick={() => {
                    setSidebarOpened(false);
                  }}
                >
                  About Me
                </Link>
              </li>
              {menus.map((menu) =>
                menu.children.length != 0 ? (
                  <div key={menu.id}>
                    <li
                      key={menu.id}
                      className="flex flex-row justify-between group cursor-pointer"
                      onClick={() =>
                        setExpandedMenu((prev) => (prev === menu.id ? undefined : menu.id))
                      }
                    >
                      {menu.name}

                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="invisible group-hover:visible"
                      />
                    </li>
                    <motion.div
                      variants={variants}
                      initial="collapsed"
                      className="origin-top"
                      animate={
                        expandedMenu === menu.id ? "expanded" : "collapsed"
                      }
                    >
                      <ul>
                        {menu.children.map((child) => (
                          <li key={menu.id}>
                            <Link
                              href={child.url}
                              onClick={() => {
                                setSidebarOpened(false);
                              }}
                              className="hover:underline pl-4"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                ) : (
                  <li key={menu.id}>
                    <Link
                      href={menu.url}
                      onClick={() => {
                        setSidebarOpened(false);
                      }}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
