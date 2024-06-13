"use client";

import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiDotsHorizontal, HiHeart, HiOutlineHeart } from "react-icons/hi";
import { app } from "../firebase";

const Comment = ({
  comment,
  commentId,
  originalPostId,
}: {
  comment: any;
  id: any;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession();

  const db = getFirestore(app);

  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user.uid
          ),
          {
            username: session?.user?.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        console.log(snapshot.docs);
        setLikes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex(
        (like: { id: string }) => like.id === session?.user?.uid
      ) !== -1
    );
  }, [likes]);

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
        <div className="flex items-center w-[40px]">
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className="h-8 w-8 cursor-pointer text-red-600 rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
            ></HiHeart>
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-red-500 hover:bg-red-100"
            ></HiOutlineHeart>
          )}
          {likes.length > 0 && (
            <span
              className={`text-xs ${isLiked && "text-red-600"} 
            }`}
            >
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
