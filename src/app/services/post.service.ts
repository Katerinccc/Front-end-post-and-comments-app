import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PostCommand } from './../models/post-command';
import { PostResponse } from '../models/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'api/posts';
  private createPostUrl = 'http://localhost:8080/create/post';

  post: Post ={
    postId: "",
    title: "",
    author: "",
    comments: []
  };

  private postCreated = new BehaviorSubject<Post>(this.post);
  postCreated$ = this.postCreated.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }

  public getAllPost(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl)
      .pipe(
        catchError(this.handleError<Post[]>('getAllPost', []))
      );
  }

  addNewPost(post: PostCommand): Observable<Post>{
    console.log('addNewPost service', post)
    return this.http.post<PostResponse>(this.createPostUrl, post, this.httpOptions)
      .pipe(
        tap((newPost: PostResponse) =>  {
          //this.postCreated.next(newPost);
        }),
        catchError(this.handleError<any>('addNewPost'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
