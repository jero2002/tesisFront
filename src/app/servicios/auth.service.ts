import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false); 

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  constructor(
    private router: Router
  ) {}

  

  logout() {                          
    this.loggedIn.next(false);
    
  }
}