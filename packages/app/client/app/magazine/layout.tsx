import Providers from "@my-own-blog/core/lib/Providers";
import { Nanum_Myeongjo } from "next/font/google";

export const metadata = {
  title: "draft",
  description: "매거진이 되고 싶은 그저 그런 초안들",
};
const font = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-orange-5" style={font.style}>
      <Providers>{children}</Providers>
    </div>
  );
}
