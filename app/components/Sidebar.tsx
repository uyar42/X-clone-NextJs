"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { HiHome, HiDotsHorizontal } from "react-icons/hi";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Session = {
  data: {
    expiress: string;
    user: {
      name: string;
      image: string;
      username: string;
      uid: string;
      email: string;
    };
  };
};

export default function Sidebar({ params }: any) {
  const { data: session }: { data: Session; status: Boolean } = useSession();

  console.log(session);

  return (
    <div className=" h-screen flex flex-col justify-between p-3">
      <div className="flex flex-col gap-4">
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
        {session ? (
          <button
            className="bg-blue-400 rounded-full text-white hover:brightness-95 w-48 transition-all h-9 duration-200 shadow-lg hidden xl:inline font-bold"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="bg-blue-400 rounded-full text-white hover:brightness-95 w-48 transition-all h-9 duration-200 shadow-lg hidden xl:inline font-bold"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className="text-sm  text-gray-700 flex items-center cursor-pointer p-3 hover:bg-gray-100 rounded-full gap-3 transition-all duration-200">
          <Image
            className="rounded-full"
            src={session?.user?.image}
            width={30}
            height={30}
            alt="my img"
          ></Image>
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session?.user.name}</h4>
            <p className="text-gray-500">{session?.user.username}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-8  hidden xl:inline"></HiDotsHorizontal>
        </div>
      )}
    </div>
  );
}
