"use client";

import { useRecoilState } from "recoil";

import { modalState } from "../atom/modalAtom";

import React from "react";

export const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <h1>Comment</h1>
      {open && <h1>The modal is open</h1>}
    </div>
  );
};
