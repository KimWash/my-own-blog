# my-own-blog
-----

~https://my-own-blog-xi.vercel.app/ 에서 진행 현황 지켜보기~
Vercel은 내렸어요.

<a href="https://kimwash.notion.site/6b4507b23af9429599efc183f1269879?v=7df2add84384488c8f002dc1352d3caf&pvs=4">여기</a>에서 (거의) 매일 올리는 일지를 확인해보세요.

Next.js를 이용한 마크다운 기반 블로그를 만들어 보고 있어요.

### 이딴거 왜함? 그냥 있던거 쓰지
음.. vuepress로 기존에 이용하던 블로그의 디자인을 바꿔보려다가 썸네일 등 한계에 부딪혔어요. 그래서 좀 갈아엎어보려고요.

아.. 그냥 상용 블로그를 쓰면 되지 않냐고요..? 재미 없잖아요! 실력 안 녹슬 겸 토이 느낌으로 계속 들고 가보려고요.

### 개발 계획
기존에 마크다운으로 작성된 글을 모두 안전하게 이전할 수 있도록 준비중이에요. 그리고 순수 Static Page로 관리 되던 기존의 블로그와 다르게 아마 글을 저장하는 서버가 있긴 해야할 것 같아요.

그리고 에디터도 만들어서 넣어볼 생각입니다.

개발 얘기가 아닌 사적인 얘기들도 담아보기 위해서 비밀글 기능 등도 생각중이고요.

전역할때쯤이면.. 완성되어 있지 않을까요..?

### 지금까지 적용해본 것들 (03.28)
- Next.js + Prisma + MySQL 조합
- CI 파이프라인 구축
  과정
  1. 환경변수 주입
  2. Prisma Client 생성 및 DB에 반영
  3. ghcr.io에 배포
- 리액트에서 마크다운 렌더링 (toast 규격으로 변경)
  - 코드 하이라이터
- (04.21) Toast UI Editor 를 이용한 마크다운 에디터 구현
- (04.21) PreSigned URL을 이용한 이미지 업로드
- (04.21) 모노레포 적용
- (04.21) 쌈@뽕한 테이블 구현
- 오브젝트 스토리지와의 조합으로 미디어 스트리밍
