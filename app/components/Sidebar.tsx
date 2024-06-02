import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome } from "react-icons/hi";

export default function Sidebar({ params }: any) {
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <FaXTwitter className="w-16 h-16 cursor-pointer p-3 hover:bg-gray-200 rounded-full transition-all duration-200"></FaXTwitter>
      </Link>
      <Link
        href="/"
        className="flex items-center p-3 hover:bg-gray-200 rounded-full transition-all duration-200 gap-2 w-fit"
      >
        <HiHome className="w-7 h-7"></HiHome>
        <span className="font-bold hidden xl:inline">Home</span>
      </Link>
      <button className="bg-blue-400 rounded-full text-white hover:brightness-95 w-48 transition-all h-9 duration-200 shadow-lg hidden xl:inline font-bold">
        Sign In
      </button>
    </div>
  );
}
