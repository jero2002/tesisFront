import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { Usuario, UsuarioDTOUpdate } from '../models/i-usuario';



@Injectable({
  providedIn: 'root'
})
export class RegistoService {

  headers = new HttpHeaders({
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  });

  constructor(private http: HttpClient) { }

  urlBase = environment.baseApiUrl;

  PostRegistro(u: Usuario): Observable<any> {
    return this.http.post(this.urlBase + "Register/PostRegister", u, { headers: this.headers });
  }

  PutUsuario(usuario: UsuarioDTOUpdate): Observable<any> {
    return this.http.put(this.urlBase + "Register/PutUsuario", usuario, { headers: this.headers });
  }
}
