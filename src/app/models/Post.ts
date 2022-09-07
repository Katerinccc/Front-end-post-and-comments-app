import { Comment } from "./comment"

export interface Post{
  postId: string,
  title: string,
  author: string,
  comments: Comment[]
}
