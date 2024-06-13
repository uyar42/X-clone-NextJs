"use client";

import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { app } from "../firebase";

const Comments = ({ id }: { id: string }) => {
  const db = getFirestore(app);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [db, id]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment.data()}
          commentId={comment.id}
          originalPostId={id}
        />
      ))}
    </div>
  );
};

export default Comments;
