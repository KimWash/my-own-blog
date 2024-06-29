"use client";

import { createPost } from "../actions/post/create";
import PostEditContainer from "./PostEditContainer";
import {MenuItem} from '@my-own-blog/core/types/Menu'

export default function PostCreateContainer({
  initialCategory,
  categories,
}: {
  initialCategory: string;
  categories: MenuItem[];
}) {
  return (
    <PostEditContainer
      categories={categories}
      onSubmit={createPost}
      initialCategory={initialCategory}
    />
  );
}
