import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostResponse } from 'src/app/models/post-response';
import { WebSocketSubject } from 'rxjs/webSocket';
import { WebSocketService } from 'src/app/services/web-socket.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  webSocket?: WebSocketSubject<PostResponse>;

  postList: PostResponse[] = [];

  constructor(private postService: PostService,
    private socketService: WebSocketService) { }

  ngOnInit(): void {
      this.getAllPost();
      this.connectionToMainSpace();
  }

  ngOnDestroy(): void {
    this.webSocket?.complete;
  }

  public getAllPost(): void{
    this.postService.getAllPost()
      .subscribe(allPost => this.postList = allPost.reverse());
  }

  public connectionToMainSpace(){
    this.webSocket = this.socketService.connectionToMainSpace();
    this.webSocket.subscribe((post => {
      this.postList.unshift(post);
      console.log(post)
    }))
  }

}
