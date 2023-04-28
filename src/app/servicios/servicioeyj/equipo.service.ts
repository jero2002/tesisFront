import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/app/environments/environments";
import { DTOEquipo, Equipo } from "src/app/models/i-equipo";

@Injectable({
    providedIn: 'root'
  })
  export class EquipoService {
  
    headers = new HttpHeaders({
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    });
  
    constructor(private http: HttpClient) { }
  
    urlBase = environment.baseApiUrl;
  
    PostRegistroE(u: Equipo): Observable<any> {
      return this.http.post(this.urlBase + "RegistrarE/PostEquipo", u, { headers: this.headers });
    }
  
    GetProvincias(): Observable<any> {
        return this.http.get(this.urlBase + "RegistrarE/GetProvincia", { headers: this.headers })
    }
    
    GetEstadoE(): Observable<any> {
        return this.http.get(this.urlBase + "RegistrarE/GetEstadoEquipo", { headers: this.headers })
    }

    GetGeneroE(): Observable<any> {
        return this.http.get(this.urlBase + "RegistrarE/GetGeneroEquipo", { headers: this.headers })
    }

    GetEquipoById(id: number): Observable<any> {
      return this.http.get(this.urlBase + "RegistrarE/GetEquipoById/" + id, { headers: this.headers });
    }
  
    PutEquipo(equipo: DTOEquipo): Observable<any> {
      return this.http.put(this.urlBase + "RegistrarE/PutEquipo", equipo, { headers: this.headers });
    }

    GetEquiposjugador(id: number): Observable<any> {
      return this.http.get(this.urlBase + "RegistrarE/GetEquiposjugador/" + id, { headers: this.headers });
    }
  }