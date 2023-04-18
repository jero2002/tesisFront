import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import {  UserLocalStorage, UsuarioDTOUpdate} from '../models/i-usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }

    urlBase = environment.baseApiUrl;

    GetUsuarioByID(id: number): Observable<UsuarioDTOUpdate> {
        return this.http.get<UsuarioDTOUpdate>(this.urlBase + "Usuario/getUsuarioByID/" + id);
    }
}
