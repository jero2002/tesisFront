import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';




@Injectable({
  providedIn: 'root'
})
export class ReporteService {

    headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      });

  private url = environment.baseApiUrl;
 

 
  constructor(private http: HttpClient, private router: Router) { }


  GetReporteJugadoresxProvincia(): Observable<any> {
    return this.http.get(this.url + "Reportes/jugadoresporprovincia", { headers: this.headers })
}

GetReporteJugadoresxPosicion(): Observable<any> {
  return this.http.get(this.url + "Reportes/jugadoresporposicion", { headers: this.headers })
}


}
