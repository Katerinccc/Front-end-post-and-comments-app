import { Comment } from "./Comment"

export interface Post{
  postId: string,
  title: string,
  author: string,
  comments: Comment[]
}
