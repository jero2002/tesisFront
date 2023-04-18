import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environments';
import { UserLocalStorage, UsuarioDTOUpdate} from '../models/i-usuario';
import { Login } from '../models/i-login';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.baseApiUrl;
  private jwtHelper = new JwtHelperService();
  private decodedToken: any;
  private currentUser!: Login | null;
  private currenU!:Login;
  private loggedIn = new BehaviorSubject<boolean>(false);
 
  constructor(private http: HttpClient, private router: Router, private authService: AuthService,private userservice: UsuarioService) { }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); 
  }

  usuarioLogueado(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  postLogin(dto: Login): Observable<void> {
    return this.http.post(`${this.url}Login/PostLogin`, dto)  
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user;
            this.authService.setLoggedIn(true);
            this.router.navigate(['/paginas/principal']);
          }
        })
      );
  }
  

  desloguearUsuario(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.loggedIn.next(false);
  }

  checkUseHasRole(roles: number[]): boolean {        
    const json = localStorage.getItem('user');
    this.currentUser = json ? JSON.parse(json) : null;

    return (!!this.currentUser && roles.includes(this.currentUser?.rol)) && this.usuarioLogueado();
  }

  checkCanLoad(roles: number[]): boolean {
    const json = localStorage.getItem('user');
    this.currentUser = json ? JSON.parse(json) : null;

    return (!!this.currentUser && roles.includes(this.currentUser?.rol));
  }

  getIdJugador(): Login | null {
    return this.currentUser;
  }

  getUsuario():Login{
    return this.currenU;
  }

  getUserIdFromLocalStorage(): number {
    const json = localStorage.getItem('user');
    const object = json ? JSON.parse(json) : null;
    return object ? object.idUsuario : 0;
  }

  updateCurrentUserInLocalStorage(): void {
    const userId = this.currentUser?.idUsuario;
    if (userId !== undefined) {
      this.userservice.GetUsuarioByID(userId).subscribe({
        next: (user: UsuarioDTOUpdate) => {
          const userLocalStorage: UserLocalStorage = {
            idUsuario: user.idUsuario,
            email: user.email,
            contrasenia: this.currentUser?.contrasenia || '',
            nombre: user.nombre,
            rol: user.rol,
            idJugador: user.idJugador,
            idEquipo: user.idEquipo,
            token: this.currentUser?.token || '',
            message: this.currentUser?.message || '',
            ok: this.currentUser?.ok || false,
            error: this.currentUser?.error || '',
            codigoEstado: this.currentUser?.codigoEstado || 0
          };
          localStorage.setItem('user', JSON.stringify(userLocalStorage));
          this.currentUser = userLocalStorage;
        },
        error: (e: any) => { alert(e.error); console.log(e); }
      });
    } 
  }
  


}
