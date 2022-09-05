import { Post } from "./models/post"
import { Comment } from "./models/Comment"

const commentsPost1: Comment[] = [
  {postId: "1", commentId: "Pl8h7", author: "Claudia Castañeda", content: "Comment to the first post ever"},
  {postId: "1", commentId: "Pl98k7", author: "Claudia Castañeda", content: "Second comment to the first post ever"},
]

const commentsPost2: Comment[] = [
  {postId: "2", commentId: "PLp7", author: "Luisa Diaz", content: "Comment to the second post ever"}
]

export const POST: Post[] = [
  {postId: "1", title: "My first post", author: "Katerin Calderon", comments:commentsPost1},
  {postId: "2", title: "My second post", author: "Luis Arboleda", comments: commentsPost2},
  {postId: "3", title: "My third post", author: "Stephany Yepes", comments: []},
  {postId: "4", title: "My next post", author: "Katerin Calderon", comments: []},
]
