"use client";

import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";

const Comment = ({ comment, id }: { comment: any; id: any }) => {
  return (
    <div className="flex border-b  border-gray-200 p-4 hover:bg-gray-50 pl-10">
      <div className="flex-shrink-0 mr-4">
        <Image
          className="rounded-full"
          src={comment?.userImg || "/default-profile.png"} // Provide a fallback image if profileImg is missing
          width={40}
          height={40}
          alt="Profile Image"
        />
      </div>
      <div className="flex-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{comment?.name}</h4>
            <span className="text-xs truncate">@{comment?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <p className="text-gray-800 text-sm my-3">{comment?.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
