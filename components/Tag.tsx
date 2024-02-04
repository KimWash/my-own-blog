export interface TagProps {
  children: React.ReactNode;
  color?: string;
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
  color = "lightgray",
  size = "md",
  borderRadius = 10,
}: TagProps) {
  return (
    <div
      style={{
        backgroundColor: color,
        borderRadius,
        padding: sizeMap[size],
      }}
    >
      {children}
    </div>
  );
}
