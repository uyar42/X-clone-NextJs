"use client";

import {
  HiHeart,
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
} from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { modalState } from "../atom/modalAtom";
import { useRecoilState } from "recoil";

export const Icons = ({ id, uid }: { id: string; uid: string }) => {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState<null | Boolean>(false);
  const [likes, setLikes] = useState<any>([]);
  const [open, setOpen] = useRecoilState(modalState);
  const db = getFirestore(app);
  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
          username: session?.user?.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      console.log(snapshot.docs);
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex(
        (like: { id: string }) => like.id === session?.user?.uid
      ) !== -1
    );
  }, [likes]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?"))
      if (session?.user?.uid === uid)
        deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Document successfully deleted!");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error removing documnet: ", error);
          });
      else {
        alert("You are not authorized to delete this post");
      }
  };

  return (
    <div className="flex justify-start gap-5 p-2 text-gray-500">
      <HiOutlineChat
        className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
        onClick={() => setOpen(!open)}
      ></HiOutlineChat>
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

      {session?.user?.uid === uid && (
        <HiOutlineTrash
          onClick={deletePost}
          className="h-8 w-8 cursor-pointer rounded-full transition duration-300 ease-in-out p-2 hover:text-sky-500 hover:bg-sky-100"
        ></HiOutlineTrash>
      )}
    </div>
  );
};
