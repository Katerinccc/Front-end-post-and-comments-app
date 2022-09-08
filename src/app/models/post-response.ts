import { Comment } from "./comment"

export interface PostResponse{
  id: string,
  postId: string,
  author: string,
  title: string,
  comments: Comment[]
}
