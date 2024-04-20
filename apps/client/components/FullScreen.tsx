/* eslint-disable react/display-name */
import { MotionStyle, motion } from "framer-motion";
import {
  ForwardedRef,
  PropsWithChildren,
  PropsWithRef,
  forwardRef,
} from "react";

const FullScreen = {
  Page: ({ children, style }: PropsWithChildren & { style?: MotionStyle }) => {
    const isDev = process.env.NODE_ENV === "development";
    return (
      <motion.div
        className="flex justify-center items-center h-full"
        style={isDev ? {...style, borderBottom: '1px solid yellow'} : style}
      >
        {children}
      </motion.div>
    );
  },
  Container: forwardRef<HTMLDivElement, PropsWithChildren>(
    ({ children }, ref) => {
      return (
        <div className="overflow-auto h-full" ref={ref}>
          {children}
        </div>
      );
    }
  ),
};

export default FullScreen;
