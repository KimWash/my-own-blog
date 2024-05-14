"use client";

import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function SidebarDemo() {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useRef(null);
  return (
    <div>
      <button className="border" onClick={() => setIsOpened(true)}>
        open
      </button>

      <CSSTransition
        in={isOpened}
        nodeRef={ref}
        timeout={200}
        classNames="node"
        mountOnEnter
        unmountOnExit
      >
        <div ref={ref}>
          opened
          <button className="border" onClick={() => setIsOpened(false)}>
            close
          </button>
        </div>
      </CSSTransition>
    </div>
  );
}
