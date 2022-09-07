import { Comment } from "./comment"

export interface Post{
  id: string,
  title: string,
  author: string,
  comments: Comment[]
}
