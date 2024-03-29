export interface TagProps {
  children: React.ReactNode;
  color?: string;
  fontColor?: string;
  size?: "sm" | "md" | "lg";
  borderRadius?: number;
}

const sizeMap = {
  sm: 5,
  md: 7,
  lg: 10,
};

export default function Tag({
  children,
  color = "#4781ff",
  fontColor = "white",
  size = "md",
  borderRadius = 10,
}: TagProps) {
  return (
    <div
      className="inline-block whitespace-nowrap"
      style={{
        backgroundColor: color,
        borderRadius,
        color: fontColor,
        padding: sizeMap[size],
        fontSize: sizeMap[size] + 8,
      }}
    >
      {children}
    </div>
  );
}
