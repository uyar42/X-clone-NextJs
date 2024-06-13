import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import { Icons } from "./Icons";

type Posts = {
  id: string;
  uid: string;
  name?: string;
  username?: string;
  text: string;
  profileImg?: string;
  timestamp: any;
  image?: string | null;
};

export const Post = ({ post }: { post: Posts[] }) => {
  return (
    <div className="flex border-b  border-gray-200 p-4 hover:bg-gray-50">
      <div className="flex-shrink-0 mr-4">
        <Image
          className="rounded-full"
          src={post?.profileImg || null}
          width={50}
          height={50}
          alt="Profile Image"
        />
      </div>
      <div className="flex-1 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-sm truncate">{post?.name}</h4>
            <span className="text-xs truncate">@{post?.username}</span>
          </div>
          <HiDotsHorizontal className="text-sm" />
        </div>
        <Link href={`posts/${post?.id}`}>
          <p className="text-gray-800 text-sm my-3">{post?.text}</p>
        </Link>
        <Link href={`posts/${post?.id}`}>
          {post?.image ? (
            <Image
              src={post?.image}
              width={1200}
              height={400}
              alt="post-image"
              className="rounded-2xl "
            ></Image>
          ) : (
            <></>
          )}
        </Link>
        <Icons id={post.id} uid={post?.uid} />
      </div>
    </div>
  );
};
