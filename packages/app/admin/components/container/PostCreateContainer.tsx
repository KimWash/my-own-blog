"use client";

import { createPost } from "../actions/post/create";
import PostEditContainer from "./PostEditContainer";

export default function PostCreateContainer({initialCategory}: {initialCategory: string}) {
  return <PostEditContainer onSubmit={createPost} initialCategory={initialCategory}/>;
}
