import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postUrl = 'api/posts';

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

  addNewPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.postUrl, post, this.httpOptions)
      .pipe(
        tap((newPost: Post) =>  {
          this.postCreated.next(newPost);
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
