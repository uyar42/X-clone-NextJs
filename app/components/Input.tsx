"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";

export default function Input() {
  const { data: session } = useSession();

  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200  p-3 space-x-3 w-full">
      <div className="flex-shrink-0">
        <Image
          alt="user-img"
          width={30}
          height={50}
          src={session?.user.image}
          className=" rounded-full cursor-pointer hover:brightness-95 "
        ></Image>
      </div>
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700 "
          placeholder="Whats happening"
        ></textarea>
        <div className="flex  justify-between pt-2.5">
          <HiOutlinePhotograph className="h-10 w-10  p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"></HiOutlinePhotograph>
          <button
            disabled
            className="bg-blue-500  rounded-full px-4 py-1.5 font-bold shadow-md disabled:opacity-50 text-white  hover:brightness-95"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
