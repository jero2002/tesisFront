import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    this.loggedIn.next(token !== null);
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }
 
 
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setLoggedIn(false);
  this.router.navigate(['/login']);
}

logoutForzado() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setLoggedIn(false);
  
}


 
}
