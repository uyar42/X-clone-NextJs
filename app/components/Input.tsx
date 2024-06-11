"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

export default function Input() {
  const { data: session } = useSession();
  const imagePickRef = useRef<null | HTMLInputElement>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>();
  const [selectedFile, setSelectedFile] = useState<Blob | null>();
  const [imageFileUploading, setImageFileUploading] = useState<Boolean>();
  const [text, setText] = useState<null | string>("");
  const [postLoading, setPostLoading] = useState<Boolean>(false);
  const db = getFirestore(app);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = async () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + selectedFile;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile as Blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setImageFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    if (!session?.user) {
      console.error("User is not logged in.");
      return;
    }

    setPostLoading(true);

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        uid: session.user.uid,
        name: session.user.name,
        username: session?.user?.username,
        text,
        profileImg: session.user.image,
        timestamp: serverTimestamp(),
        image: imageFileUrl || null,
      });

      console.log("Document written with ID: ", docRef.id);

      setText("");
      setImageFileUrl(null);
      setSelectedFile(null);
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setPostLoading(false);
    }
  };

  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3 w-full">
      <div className="flex-shrink-0">
        <Image
          alt="user-img"
          width={30}
          height={50}
          src={session?.user?.image!}
          className="rounded-full cursor-pointer hover:brightness-95"
        />
      </div>
      <div className="w-full divide-y divide-gray-200">
        <textarea
          className="w-full border-none outline-none tracking-wide min-h-[50px] text-gray-700"
          placeholder="Whats happening"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        {imageFileUrl && (
          <Image
            width={50}
            height={50}
            alt="img"
            src={imageFileUrl}
            className={`w-full max-h-[250px] pr-4 object-cover cursor-pointer
              ${imageFileUploading ? "animate-pulse" : ""}
              `}
          />
        )}
        <div className="flex justify-between pt-2.5">
          <HiOutlinePhotograph
            onClick={() => imagePickRef?.current?.click()}
            className="h-10 w-10 p-2 text-sky-500 hover:bg-sky-100 rounded-full cursor-pointer"
          />
          <input
            type="file"
            ref={imagePickRef}
            accept="image/*"
            onChange={addImageToPost}
            hidden
          />
          <button
            // disabled={text?.trim() === "" || postLoading || imageFileUploading}
            className="bg-blue-500 rounded-full px-4 py-1.5 font-bold shadow-md disabled:opacity-50 text-white hover:brightness-95"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
