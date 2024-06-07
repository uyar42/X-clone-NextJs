"use client";

import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";

export const Icons = () => {
  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"></HiOutlineChat>
      <HiOutlineHeart className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"></HiOutlineHeart>
      <HiOutlineTrash className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"></HiOutlineTrash>
    </div>
  );
};
