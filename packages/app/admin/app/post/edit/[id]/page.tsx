import { updatePost } from "@/components/actions/post/update";
import PostEditContainer from "@/components/container/PostEditContainer";
import MenuService from "@my-own-blog/core/service/MenuService";
import { PostService } from "@my-own-blog/core/service/PostService";

export default async function Page({ params }: { params: { id: number } }) {
  // Todo: 객체에서 함수를 제거해야 클라이언트 컴포넌트로 전달이 가능함.
  // react-query를 이용할 때는 serialize/deserialize 과정에서 당연하게 제거됐지만..
  // 직접 서버 컴포넌트로 구성하니 이런 문제가 또 있네요.
  const initialPost = await PostService.getPost(params.id);
  const groupedCategories = await MenuService.getMenus();

  return (
    <PostEditContainer
      initialPost={JSON.parse(JSON.stringify(initialPost))}
      initialCategory={initialPost.category.name!}
      categories={groupedCategories}
      onSubmit={updatePost}
    />
  );
}
