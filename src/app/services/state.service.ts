import { AppState } from './../models/app-state';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class StateService {

  constructor(private router: Router) { }

  appState$ = new BehaviorSubject<AppState>({
    loggedIn: false,
    authenticateUser: Object,
    token: ""
  });

  public validateLogin(): boolean {
    let validation = false;
    this.appState$.subscribe(currentState => {
      if(!currentState.loggedIn){
        this.router.navigateByUrl("/login");
        return;
      }
      validation = true;
    })
    return validation;
  }

}
