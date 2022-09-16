import { AuthRequest } from './../../models/auth-request';
import { StateService } from './../../services/state.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private state: StateService) {
  }

  ngOnInit(): void {
  }

  async signInWithGoogle(){
    const loginResponse = await this.authService.googleSignIn();
    console.info(loginResponse);

    const authRequest: AuthRequest = {
      userEmail: loginResponse.user.email || "",
      password: loginResponse.user.email || ""
    }

    if(loginResponse){

      this.state.appState$.next({
        loggedIn: true,
        authenticateUser: loginResponse,
        token: ""
      })


      this.authService.loginIntoAlpha(authRequest)
        .subscribe({
          next: token => {
            if(token){
                console.info(token.access_token)
                this.state.appState$.next({
                  loggedIn: true,
                  authenticateUser: loginResponse,
                  token: token.access_token
                })
            }
            this.router.navigateByUrl('/posts');
          }
        })
    }
  }

}

