import Tag, { TagProps } from "@my-own-blog/core/components/Tag";

const levelColorMap = {
  1: {
    color: "#f14668",
    fontColor: "white",
  },
  2: {
    color: "#ffe08a",
    fontColor: "black",
  },
  3: {
    color: "#48c78e",
    fontColor: "white",
  },
};

export default function Stack(props: TagProps & { level: 1 | 2 | 3 }) {
  const colorMap = levelColorMap[props.level];
  return (
    <Tag {...props} color={colorMap.color} fontColor={colorMap.fontColor} />
  );
}
