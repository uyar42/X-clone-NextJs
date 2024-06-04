import type { Metadata } from "next";
import { Inter } from "next/font/google";
import News from "./components/News";
import SessionWrapper from "./components/SessionWrapper";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X Clone",
  description: "X Kral ali nextjs deneme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex justify-between mx-auto max-w-6xl">
            <div className="hidden sm:inline border-r h-screen">
              <Sidebar></Sidebar>
            </div>
            <div className="w-2xl flex-1">{children}</div>
            <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]">
              <div className="stick top-0 bg-white py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
                ></input>
              </div>
              <News></News>
            </div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
