import Tag from "@core/components/Tag";
import client, { Post } from "@db/prisma";
import "@core/lib/date/date.extensions";
import Table, { Column } from "@/components/Table";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { categories: string[] };
}) {
  const posts = await client.post.findMany({
    where: {
      is_deleted: undefined,
    },
  });
  const columns = [
    {
      name: "title",
      label: "제목",
    },
    {
      name: "create_dt",
      label: "작성일",
      render(value: Date) {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: value.format("yyyy-MM-dd <br/> HH:mm:ss"),
            }}
          ></div>
        );
      },
    },
    {
      name: "description",
      label: "설명",
    },
    {
      name: "is_deleted",
      label: "삭제 여부",
      render(value: boolean) {
        return value ? <Tag color="red">삭제됨</Tag> : "";
      },
    },
  ] as Column<Post>[];
  return (
    <main>
      <h3>URL: /post/{params.categories.join("/")}</h3>
      <Link href="/post/create">
        <button className="btn">글 작성</button>
      </Link>
      <Table
        columns={columns as Column<Post>[]}
        rows={posts as Post[]}
        keyMapper={(data) => data.id}
        linkMapper={(data) => `/post/edit/${data.id}`}
      />
    </main>
  );
}
