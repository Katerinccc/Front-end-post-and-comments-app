import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PostCommand } from './../models/post-command';
import { PostResponse } from '../models/post-response';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private createPostUrl = 'http://localhost:8080/create/post';
  private commentUrl = 'http://localhost:8080/add/comment';
  private postById = "http://localhost:8081/beta/post";
  private allPost = "http://localhost:8081/allposts";


  post: PostResponse ={
    id: "",
    postId: "",
    author: "",
    title: "",
    comments: []
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(
    private http: HttpClient) { }

  public getPost(postId: string): Observable<PostResponse> {
    const url = `${this.postById}/${postId}`;
    return this.http.get<PostResponse>(url)
    .pipe(
      catchError(this.handleError<PostResponse>(`getHero id=${postId}`))
    );
  }

  public getAllPost(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(this.allPost)
      .pipe(
        catchError(this.handleError<PostResponse[]>('getAllPost', []))
      );
  }

  public addNewPost(post: PostCommand): Observable<PostResponse>{
    return this.http.post<PostResponse>(this.createPostUrl, post, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addNewPost'))
      );
  }

  public addCommentToPost(newComment: Comment): Observable<PostResponse>{
    return this.http.post<PostResponse>(this.commentUrl, newComment, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('addCommentToPost'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
