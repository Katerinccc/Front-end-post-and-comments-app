import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostCommand } from './../models/post-command';
import { PostResponse } from '../models/post-response';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private createPostUrl = 'https://alpha-hollows-00755.herokuapp.com/create/post';
  private commentUrl = 'https://alpha-hollows-00755.herokuapp.com/add/comment';
  private postById = "https://beta-sleepy-77995.herokuapp.com/beta/post";
  private allPost = "https://beta-sleepy-77995.herokuapp.com/allposts";

  post: PostResponse ={
    id: "",
    postId: "",
    author: "",
    title: "",
    comments: []
  };

  constructor(
    private http: HttpClient
  ) { }

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

  public addNewPost(post: PostCommand, token: string): Observable<PostResponse>{
    return this.http.post<PostResponse>(this.createPostUrl, post, {
      headers: new HttpHeaders({  'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
    })
      .pipe(
        catchError(this.handleError<any>('addNewPost'))
      );
  }

  public addCommentToPost(newComment: Comment, token: string): Observable<PostResponse>{
    return this.http.post<PostResponse>(this.commentUrl, newComment, {
      headers: new HttpHeaders({  'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token})
    })
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
