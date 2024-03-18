import { Post } from "@/app/api/model/Post";
import Tag from "@/components/Tag";
import { getBaseUrl } from "@/lib/baseUrl";
import "@/lib/date.extensions";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function Page({ params }: { params: { id: number } }) {
  const posts = (await fetch(getBaseUrl() + "/api/post/" + params.id, {
    cache: "no-cache",
  }).then((res) => res.json())) as Post;
  const matterResult = matter(posts.content);
  const postContent = await (await remark().use(html).process(matterResult.content)).toString();
  return (
    <div>
      <h1>{posts.title}</h1>
      <h3>{posts.description}</h3>
      <h3>{posts.date.toString()}</h3>
      <div>
        {posts.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{__html: postContent}}>
        </div>
    </div>
  );
}
