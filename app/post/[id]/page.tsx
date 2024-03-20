import { Post, PostDetail, PostSchema } from "@/lib/model/Post";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/baseUrl";
import { connectDB } from "@/lib/database";
import "@/lib/global.date.extensions";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import mongoose from "mongoose";

export default async function Page({ params }: { params: { id: number } }) {
  console.log(params, getBaseUrl());
  // const posts = (await fetch(getBaseUrl() + "/api/post/" + params.id, {
  //   cache: "no-cache",
  // }).then((res) => {
  //   console.log(res)
  //   return res.json()
  // })) as PostDetail;
  // mongoose test
  await mongoose
  .set({ debug: true, strictQuery: false })
  .connect(process.env.NEXT_MONGO_URL)
  .then((mongoose) => mongoose);

  const posts = (await (Post.find())).map(doc => doc.toObject())[0];
  const matterResult = matter(posts.content);
  const postContent = await (
    await remark().use(html).process(matterResult.content)
  ).toString();
  return (
    <div>
      <h1>{posts.title}</h1>
      <h3>{posts.description}</h3>
      <h3>{posts.date.toString()}</h3>
      <div>
        {posts.tags.map((tag:string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
    </div>
  );
}
