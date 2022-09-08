import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { PostResponse } from '../models/post-response';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  url = webSocket('ws://localhost:8082');

  constructor() { }

  connectionToMainSpace(): WebSocketSubject<PostResponse>{
    return webSocket('ws://localhost:8082/retrieve/mainSpace');
  }

  connectionToPostDetail(postId: string): WebSocketSubject<Comment>{
    return webSocket('ws://localhost:8082/retrieve/'+ postId);
  }


}
