"use client";

import { createPost } from "../actions/post/create";
import PostEditContainer from "./PostEditContainer";

export default function PostCreateContainer({}: {}) {
  return <PostEditContainer onSubmit={createPost} />;
}
