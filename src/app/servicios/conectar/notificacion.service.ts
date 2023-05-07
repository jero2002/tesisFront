import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environments";

@Injectable({
    providedIn: 'root'
  })
  export class NotificacionService {
  
      headers = new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        });
  
    private url = environment.baseApiUrl;
   
  
   
    constructor(private http: HttpClient, private router: Router) { }

    postNotificacionJugadorxEquipo(idjugador: number, idequipo: number): Observable<any> {
        return this.http.post(this.url + "Notificacion/je/" + idjugador + "/" + idequipo , { headers: this.headers });
    }

    postNotificacionEquipoxJugador(idequipo: number, idjugador: number): Observable<any> {
        return this.http.post(this.url + "Notificacion/ej/" + idequipo + "/" + idjugador , { headers: this.headers });
    }

    getnotificacionequipo(id: number): Observable<any> {
        return this.http.get(this.url + "Notificacion/getnotificacionequipo/" + id, { headers: this.headers });
    }

    getnotificacionjugador(id: number): Observable<any> {
        return this.http.get(this.url + "Notificacion/getnotificacionjugador/" + id, { headers: this.headers });
    }

    DeleteNotificacion(id: number): Observable<any> {
        return this.http.delete(this.url + "Notificacion/DeleteNotificacion/" + id, { headers: this.headers });
    }

    DeleteNotificacionEJ(id: number): Observable<any> {
        return this.http.delete(this.url + "Notificacion/DeleteNotificacionej/" + id, { headers: this.headers });
    }

    postEquipoJugador(idjugador: number, idequipo: number): Observable<any> {
        return this.http.post(this.url + "RegistrarJ/AceptarSolicitud/" + idjugador + "/" + idequipo , { headers: this.headers });
    }




}
  