import { app } from "@/app/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { HiArrowLeft } from "react-icons/hi";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import { Post } from "@/app/components/Post";
import Comments from "@/app/components/Comments";

export default async function page({ params }: Params) {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, "posts", params.id));
  data = { ...querySnapshot.data(), id: querySnapshot.id };

  return (
    <div className="max-w-lg mx-auto border-r border-l min-h-screen">
      <div className="flex items-center space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <Link href={"/"} className="hover:bg-gray-100 rounded-full p-2">
          <HiArrowLeft className="h-5 w-5"></HiArrowLeft>
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <Post post={data} id={data.id}></Post>
      <Comments id={params.id}></Comments>
    </div>
  );
}
