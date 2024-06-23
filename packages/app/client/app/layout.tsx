import type { Metadata } from "next";
// import "normalize.css";
import "./globals.css";
import "@my-own-blog/core/lib/date/date.extensions.ts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import Providers from "@my-own-blog/core/lib/Providers";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={"flex flex-col "}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
