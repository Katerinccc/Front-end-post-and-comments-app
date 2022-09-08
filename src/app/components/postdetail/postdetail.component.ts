import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { PostResponse } from 'src/app/models/post-response';
import { Comment } from 'src/app/models/comment';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import {v4 as uuid4} from 'uuid';

@Component({
  selector: 'app-post-detail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  post: PostResponse = {
    id: "",
    postId: "",
    title: "",
    author: "",
    comments: []
  };

  webSocket?: WebSocketSubject<Comment>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location,
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  ngOnDestroy(): void {
    this.webSocket?.complete;
  }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('postId') || '';
    this.postService.getPost(postId)
      .subscribe(post => {
        this.post = post
        this.connectionToPostDetail(postId.toString());
      });
  }

  addNewComment(){
    const postId =this.route.snapshot.paramMap.get('postId') || '';
    const author = document.getElementById("authorComment") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLInputElement;

    let newUuid = uuid4();

    const newComment:Comment = {
      postId: postId,
      commentId: newUuid,
      author: author.value,
      content: content.value
    }

    this.postService.addCommentToPost(newComment).subscribe();
    author.value = "";
    content.value = "";
  }

  public connectionToPostDetail(postId: string){
    this.webSocket = this.socketService.connectionToPostDetail(postId);
    this.webSocket.subscribe((comment => {
      this.post.comments.unshift(comment)
    }))
  }

  goBack(): void {
    this.location.back();
  }

}
