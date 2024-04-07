import "@/lib/date/global.date.extensions";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Image from "next/image";
import usePostDetailViewModel from "@/components/hooks/usePostDetailViewModel";

export default async function Page({ params }: { params: { id: number } }) {
  const { medias, tags, ...post } = await usePostDetailViewModel(params.id);
  return (
    <div className="p-8">
      {tags?.map((tag) => (
        <span key={tag.id}>#{tag.name} </span>
      ))}
      <div className="flex flex-row justify-between items-end">
        <h1>{post?.title}</h1>
        <p>{post?.create_dt?.format("yyyy년 MM월 dd일")}</p>
      </div>
      <hr className="border-1 border-gray-400" />
      <p>{post?.description}</p>

      <div className="mt-10 post-content">
        <MarkdownRenderer content={post?.content ?? ""} />
        {medias?.map((media) => (
          <div key={media.id}>
            <h2>{media.name} 미디어의 고화질 파일</h2>
            <Image
              src={`/api/media/${media.id}/HIGH`}
              alt={media.name!}
              width={200}
              height={200}
            />
            <h2>중화질 파일(이라고 쓰고 아예 다른 사진이다)</h2>
            <Image
              src={`/api/media/${media.id}/MID`}
              alt={media.name!}
              width={200}
              height={200}
            />
            <h3>{media.name} 미디어의 파일 목록</h3>
            {media.files.map(async (file) => {
              return <li key={file.id}>{file.name}</li>;
            })}{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
