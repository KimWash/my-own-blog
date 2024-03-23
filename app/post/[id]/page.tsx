import { Post, PostDetail, PostSchema } from "@/lib/model/Post";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/baseUrl";
import { connectDB } from "@/lib/database";
import "@/lib/global.date.extensions";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

import mongoose from "mongoose";
import db from "db";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { tag } from "@prisma/client";

export default async function Page({ params }: { params: { id: number } }) {
  console.log(params, getBaseUrl());
  // const posts = (await fetch(getBaseUrl() + "/api/post/" + params.id, {
  //   cache: "no-cache",
  // }).then((res) => {
  //   console.log(res)
  //   return res.json()
  // })) as PostDetail;
  // mongoose test
  // console.log(
  //   "Initializing mongoose with this url: ",
  //   process.env.NEXT_MONGO_URL
  // );
  // await mongoose
  //   .set({ debug: true, strictQuery: false })
  //   .connect(process.env.NEXT_MONGO_URL)
  //   .then((mongoose) => mongoose);
  // console.log("done");

  // const posts = (await Post.find()).map((doc) => doc.toObject())[0];
  const post = await db.post.findFirst();
  const medias = await db.post.findFirst().medias();
  const mediasWithFiles =  medias?.map( (media) => ({
    ...media,
    files:  db.file.findMany({ where: { mediaId: media.id } }),
  }));
  // const tags = await db.tag((await db.post.findFirst().post_tag()))
  // console.log(tags)
  return (
    <div className="p-8">
      {/* {tags?.map((tag: tag) => (
        <span key={tag.id}>#{tag.name} </span>
      ))} */}
      <div className="flex flex-row justify-between items-end">
        <h1>{post?.title}</h1>
        <p>{post?.create_dt?.format("yyyy년 MM월 dd일")}</p>
      </div>
      <hr className="border-1 border-gray-400" />
      <p>{post?.description}</p>

      <div className="mt-10 post-content">
        <MarkdownRenderer content={post?.content ?? ""} />
        {mediasWithFiles?.map(async (media) => (
          <p key={media.id}>{media.name} | {(await media.files).map(file => <span key={file.id}>{file.name}</span>)} </p>
        ))}
      </div>
    </div>
  );
}
