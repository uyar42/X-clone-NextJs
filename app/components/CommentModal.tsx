"use client";

import { useRecoilState } from "recoil";

import { modalState, postIdState } from "../atom/modalAtom";
import { HiX } from "react-icons/hi";

import { useSession } from "next-auth/react";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { unsubscribe } from "diagnostics_channel";
import Image from "next/image";
import { async } from "@firebase/util";
export const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [input, setInput] = useState("");
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const db = getFirestore(app);
  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document!");
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);

  const sendComment = async () => {};
  return (
    <div>
      {open && (
        <ReactModal
          isOpen={open}
          ariaHideApp={false}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-md shadow-md"
        >
          <div className="p-4">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <HiX
                className="text-2xl text-gray-700 p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                onClick={() => setOpen(false)}
              ></HiX>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
              <div className="w-12 h-10 rounded-full overflow-hidden hover:brightness-95 ">
                <Image
                  width={40}
                  height={40}
                  src={post?.profileImg || undefined}
                  alt="user-img"
                  className="rounded-full mr-4"
                ></Image>
              </div>

              <h4 className="font-bold sm:text-[16px]  text-[15px] hover:underline truncate">
                {post?.name}
              </h4>
              <span className="text-sm sm-text-[15px]">@{post?.username}</span>
            </div>
            <p className="text-gray-500 text-[15px] sm-text-[15px] ml-16 mb-2">
              {post?.text}
            </p>
            <div className="flex p-3 space-x-3 ">
              <div className="w-12 h-10 rounded-full overflow-hidden hover:brightness-95">
                <Image
                  src={session?.user?.image}
                  alt="user-img"
                  width={40}
                  height={40}
                  className="rounded-full mr-4"
                ></Image>
              </div>
              <div className="w-full divide-y divide-gray-200">
                <div>
                  <textarea
                    className="w-full text-gray-700 placeholder:text-gray-500 border-none outline-none tracking-wide min-h-[50px]"
                    placeholder="Whats happening"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={2}
                  ></textarea>
                </div>
                <div className="flex items-center justify-end pt-2.5">
                  <button
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={input.trim() === ""}
                    onClick={sendComment}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      )}
    </div>
  );
};
