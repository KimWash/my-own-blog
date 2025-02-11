import PostCreateContainer from "@/components/container/PostCreateContainer";
import MenuService from "@my-own-blog/core/service/MenuService";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  // Todo: 객체에서 함수를 제거해야 클라이언트 컴포넌트로 전달이 가능함.
  // react-query를 이용할 때는 serialize/deserialize 과정에서 당연하게 제거됐지만..
  // 직접 서버 컴포넌트로 구성하니 이런 문제가 또 있네요.

  const groupedCategories = await MenuService.getMenus();
  return (
    <PostCreateContainer
      categories={groupedCategories}
      initialCategory={params.category}
    />
  );
}
