"use client";

import { TailwindSize } from "@/app/dev/about/page";

export default function RoundedButton({
  radius = "3xl",
  onClick,
  children,
}: React.PropsWithChildren<{ radius: TailwindSize; onClick?: () => void }>) {
  return (
    <button
      onClick={onClick}
      className={`rounded-${radius} bg-white p-2 border`}
    >
      {children}
    </button>
  );
}