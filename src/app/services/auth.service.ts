import { Token } from './../models/token';
import { AuthRequest } from './../models/auth-request';
import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private http: HttpClient
  ) { }

  //loginUrl = "https://alpha-hollows-00711.herokuapp.com/auth/login";
  loginUrl = "http://localhost:8080/auth/login";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public googleSignIn() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  public loginIntoAlpha(authRequest: AuthRequest): Observable<Token>{
    return this.http.post<Token>(this.loginUrl, authRequest, this.httpOptions)
    .pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }


}
