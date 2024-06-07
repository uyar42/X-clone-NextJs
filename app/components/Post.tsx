import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import { Icons } from "./Icons";

interface Posts {
  id: string;
  uid: string;
  name?: string;
  username?: string;
  text: string;
  profileImg?: string;
  timestamp: any; // You might want to use a more specific type like Firestore.Timestamp
  image?: string;
}

export const Post = ({ post, id }: { post: Posts[] }) => {
  console.log("deneme");
  return (
    <div className="flex border-b  border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex-shrink-0 mr-4">
        <Image
          className="rounded-full"
          src={post?.profileImg || "/default-profile.png"} // Provide a fallback image if profileImg is missing
          width={50}
          height={50}
          alt="Profile Image"
        />
      </div>
      <div className="flex-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-xs truncate">{post?.name}</h4>
            <span className="text-xs truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <Link href={`posts/${id}`}>
          <p className="text-gray-800 text-sm my-3">{post?.text}</p>
        </Link>
        <Link href={`posts/${id}`}>
          <Image
            src={post?.image}
            width={1200}
            height={400}
            alt="post-image"
            className="rounded-2xl "
          ></Image>
        </Link>
        <Icons />
      </div>
    </div>
  );
};
