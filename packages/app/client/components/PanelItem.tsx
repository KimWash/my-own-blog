import { MotionStyle, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function PanelItem({
  style,
  children,
}: PropsWithChildren & { style?: MotionStyle }) {
  return (
    <motion.div
      style={{
        ...style,
        background: "lightgray",
        borderRadius: 24,
        aspectRatio: 1,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        padding: 10,
      }}
    >
      {children}
      
    </motion.div>
  );
}
