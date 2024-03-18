
export interface Post {
  id: number
  title: string
  date: Date
  description: string
  tags: string[]
  thumbnailUrl?: string
  content?: string
}

export type PostDetail = Post & {content: string};
export type PostBannerDto = Post