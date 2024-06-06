"use client";

import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../firebase";
import { Post } from "./Post";

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

const Feed: React.FC = () => {
  const [data, setData] = useState<Posts[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const posts: Posts[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as Posts);
      });
      setData(posts);
    };

    fetchPosts();
  }, [db]);

  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
