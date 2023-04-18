import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environments';
import { DTOJugador, Jugador } from 'src/app/models/i-jugador';

@Injectable({
  providedIn: 'root',
})
export class JugadorService {
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  urlBase = environment.baseApiUrl;

  PostRegistroJ(u: Jugador): Observable<any> {
    return this.http.post(this.urlBase + 'RegistrarJ/PostJugador', u, {
      headers: this.headers,
    });
  }

  GetProvincias(): Observable<any> {
    return this.http.get(this.urlBase + 'RegistrarE/GetProvincia', {
      headers: this.headers,
    });
  }

  GetGenero(): Observable<any> {
    return this.http.get(this.urlBase + 'RegistrarJ/GetGenero', {
      headers: this.headers,
    });
  }
  GetEstadoJ(): Observable<any> {
    return this.http.get(this.urlBase + 'RegistrarJ/GetEstadoJ', {
      headers: this.headers,
    });
  }

  GetPosicion(): Observable<any> {
    return this.http.get(this.urlBase + 'RegistrarJ/GetPosicion', {
      headers: this.headers,
    });
  }

  GetJugadorById(id: number): Observable<any> {
    return this.http.get(this.urlBase + "RegistrarJ/GetJugadorById/" + id, { headers: this.headers });
  }

  PutJugador(jugador: DTOJugador): Observable<any> {
    return this.http.put(this.urlBase + "RegistrarJ/PutJugador", jugador, { headers: this.headers });
  }

}
