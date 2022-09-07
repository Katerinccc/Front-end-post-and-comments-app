import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const posts: Post[] = [
      {id: "1", title: "My first post", author: "Katerin Calderon", comments: [
        {postId: "1", commentId: "Pl8h7", author: "Claudia Castañeda", content: "Comment to the first post ever"},
        {postId: "1", commentId: "Pl98k7", author: "Claudia Castañeda", content: "Second comment to the first post ever"},
      ]},
      {id: "2", title: "My second post", author: "Luis Arboleda", comments: [
        {postId: "2", commentId: "PLp7", author: "Luisa Diaz", content: "Comment to the second post ever"}
      ]},
      {id: "3", title: "My third post", author: "Stephany Yepes", comments: []},
      {id: "4", title: "My next post", author: "Katerin Calderon", comments: []},
      {id: "1", title: "My first post", author: "Katerin Calderon", comments: [
        {postId: "5", commentId: "Pl8h7", author: "Claudia Castañeda", content: "Comment to the first post ever"},
        {postId: "5", commentId: "Pl98k7", author: "Claudia Castañeda", content: "Second comment to the first post ever"},
      ]}
    ];
    return {posts};
  }

  genId(posts: Post[]): string {
    return posts.length > 0 ? (Math.random()*1000).toString() : "999";
  }

}
