import PostCreateContainer from "@/components/container/PostCreateContainer";
import { PostDetailDto } from "@core/lib/model/Post";
import { PostService } from "@core/service/PostService";
import client, { Post } from "@db/prisma";
import { PostService as PostCreationService, UploadPostDto } from "@/components/services/PostService";

export default async function Page() {
  // Todo: 객체에서 함수를 제거해야 클라이언트 컴포넌트로 전달이 가능함.
  // react-query를 이용할 때는 serialize/deserialize 과정에서 당연하게 제거됐지만..
  // 직접 서버 컴포넌트로 구성하니 이런 문제가 또 있네요.
  const initialPost = JSON.parse(JSON.stringify(await PostService.getPost(1)));
  const submit = async (post: UploadPostDto) => {
   
  };
  return <PostCreateContainer initialPost={initialPost} />;
}
