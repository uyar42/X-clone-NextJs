import type { Metadata } from "next";
import { Inter } from "next/font/google";
import News from "./components/News";
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
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between mx-auto max-w-6xl">
          <div>
            <Sidebar></Sidebar>
          </div>
          <div>{children}</div>
          <div>
            <News></News>
          </div>
        </div>
      </body>
    </html>
  );
}
