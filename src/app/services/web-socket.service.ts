import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { PostResponse } from '../models/post-response';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor() { }

  connectionToMainSpace(): WebSocketSubject<PostResponse>{
    return webSocket('WSS://gamma-tor-06190.herokuapp.com/retrieve/mainSpace');
  }

  connectionForPostDetail(postId: string): WebSocketSubject<Comment>{
    return webSocket('WSS://gamma-tor-06190.herokuapp.com/retrieve/'+ postId);
  }


}
