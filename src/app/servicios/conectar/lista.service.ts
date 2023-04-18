import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { Login } from 'src/app/models/i-login';



@Injectable({
  providedIn: 'root'
})
export class ListaService {

    headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      });

  private url = environment.baseApiUrl;
 

 
  constructor(private http: HttpClient, private router: Router) { }


  GetJugadorByIdGeneroE(id: number): Observable<any> {
    return this.http.get(this.url + "RegistrarJ/GetJugadorByIDGenero/" + id, { headers: this.headers });
  }

  GetEquipoByIdGeneroJ(id: number): Observable<any> {
    return this.http.get(this.url + "RegistrarE/GetEquipoByIDGenero/" + id, { headers: this.headers });
  }


}
