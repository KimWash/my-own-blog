import { Post, PostDetail, PostSchema } from "@/lib/model/Post";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/baseUrl";
import { connectDB } from "@/lib/database";
import "@/lib/global.date.extensions";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import mongoose from "mongoose";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default async function Page({ params }: { params: { id: number } }) {
  console.log(params, getBaseUrl());
  // const posts = (await fetch(getBaseUrl() + "/api/post/" + params.id, {
  //   cache: "no-cache",
  // }).then((res) => {
  //   console.log(res)
  //   return res.json()
  // })) as PostDetail;
  // mongoose test
  console.log(
    "Initializing mongoose with this url: ",
    process.env.NEXT_MONGO_URL
  );
  await mongoose
    .set({ debug: true, strictQuery: false })
    .connect(process.env.NEXT_MONGO_URL)
    .then((mongoose) => mongoose);
  console.log("done");

  const posts = (await Post.find()).map((doc) => doc.toObject())[0];
  return (
    <div className="p-14">
      {posts.tags.map((tag: string) => (
        <span key={tag}>#{tag} </span>
      ))}
      <div className="flex flex-row justify-between items-end">
        <h1>{posts.title}</h1>
        <p>{posts.date.format("yyyy년 MM월 dd일")}</p>
      </div>
      <hr className="border-1 border-gray-400" />
      <p>{posts.description}</p>

      <div className="mt-10 post-content">
        <MarkdownRenderer content={posts.content} />
      </div>
    </div>
  );
}
