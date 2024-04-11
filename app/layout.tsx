import type { Metadata } from "next";
// import "normalize.css";
import "./globals.css";
import "@/lib/date/date.extensions";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import Providers from "@/lib/Providers";
import { ReactQueryDevtools } from 'react-query/devtools'

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
      <body className="flex flex-col">
        <Providers>

          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
