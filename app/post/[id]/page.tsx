import { PostDetail } from "@/app/api/model/Post";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/baseUrl";
import { connectDB } from "@/lib/database";
import "@/lib/global.date.extensions";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function Page({ params }: { params: { id: number } }) {
  console.log(params, getBaseUrl());
  // const posts = (await fetch(getBaseUrl() + "/api/post/" + params.id, {
  //   cache: "no-cache",
  // }).then((res) => {
  //   console.log(res)
  //   return res.json()
  // })) as PostDetail;
  const db = (await connectDB).db("my-own-blog");
  const posts = await db.collection("posts").find();
  console.log(await posts.toArray());
  return (
    <div>
      
    </div>
  );
  // const matterResult = matter(posts.content);
  // const postContent = await (
  //   await remark().use(html).process(matterResult.content)
  // ).toString();
  // return (
  //   <div>
  //     <h1>{posts.title}</h1>
  //     <h3>{posts.description}</h3>
  //     <h3>{posts.date.toString()}</h3>
  //     <div>
  //       {posts.tags.map((tag) => (
  //         <Tag key={tag}>{tag}</Tag>
  //       ))}
  //     </div>
  //     <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
  //   </div>
  // );
}
