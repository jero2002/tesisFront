import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environments';
import { Usuario } from '../models/i-usuario';
import { Login } from '../models/i-login';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.baseApiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: Login | null;
  private loggedIn = new BehaviorSubject<boolean>(false)
 
  constructor(private http: HttpClient,private router:Router ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  usuarioLogueado(): boolean {
    const token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;            //y aca que onda porque no me deja usar el ??undefined?????
  }

  postLogin(dto: Login) {
    return this.http.post(`${this.url}Login/PostLogin`, dto)  
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user;
            this.loggedIn.next(true);
          
          }
        })
      );
  }

  desloguearUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.loggedIn.next(false);
  }

  checkUseHasRole(roles: number[]): boolean {        
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    this.currentUser = object;

    return (!!this.currentUser && roles.includes(this.currentUser?.rol)) && this.usuarioLogueado();
  }

  checkCanLoad(roles: number[]): boolean {
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    this.currentUser = object;

    return (!!this.currentUser && roles.includes(this.currentUser?.rol))
  }

  getIdJugador(): Login | null{
   
    return this.currentUser;
  }

  getUserIdFromLocalStorage() : number {
    let json = localStorage.getItem('user');
    let object = json != null ? JSON.parse(json) : null;
    return object.idUsuario;
  }
}

