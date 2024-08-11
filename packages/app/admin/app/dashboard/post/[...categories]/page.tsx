import Tag from "@my-own-blog/core/components/Tag";
import client, { Category, Post } from "@my-own-blog/db";
import "@my-own-blog/core/lib/date/date.extensions";
import Table, { Column } from "@/components/Table";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { categories: string[] };
}) {
  const currentCategory = await client.category.findUnique({
    where: {
      id: params.categories[params.categories.length - 1],
    },
    // Todo: 카테고리 트리 구조를 `앱 > Flutter`와 같이 표시하려 함.
    // 이 상태로는 2 depth menu만을 지원. 메뉴 레벨에 따라 재귀적으로 include 옵션을 생성하게 하는 로직이 필요하려나?
    // 아니면 Prisma가 이런 기능을 지원하려나?
    include: {
      parent: true,
    },
  });
  if (!currentCategory) return <div>올바르지 않은 카테고리!</div>;
  const posts = await client.post.findMany({
    where: {
      is_deleted: undefined,
      category: {
        id: {
          equals: currentCategory?.id,
        },
      },
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
    <main className="p-4">
      <h1 className="text-2xl font-bold">
        {`${currentCategory.parent?.name} > ${currentCategory.name}`}
      </h1>
      <Link href="/dashboard/post/create">
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
