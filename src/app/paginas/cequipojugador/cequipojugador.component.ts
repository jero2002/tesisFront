import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTOJugador, DTOJugadorByGenero } from 'src/app/models/i-jugador';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaService } from 'src/app/servicios/conectar/lista.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cequipojugador',
  templateUrl: './cequipojugador.component.html',
  styleUrls: ['./cequipojugador.component.css']
})
export class CequipojugadorComponent implements OnInit {

  idGeneroE: number = 0; // Declarar la variable aquí

  jugadores: DTOJugadorByGenero[] = [];

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private equiposervice: EquipoService,
    private listaservice: ListaService,
    private spinner: NgxSpinnerService
  ) {

    const idEquipoLogueado = this.loginService.getIdJugador()?.idEquipo;

    if (idEquipoLogueado !== undefined) {
      this.equiposervice.GetEquipoById(idEquipoLogueado).subscribe(
        (data) => {
          this.idGeneroE = data.idGeneroE;
          this.cargarJugador(); // Llamar a cargarJugador() después de obtener idGeneroE
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  ngOnInit(): void {
  
  }

  cargarJugador() {
    this.spinner.show();
    this.listaservice.GetJugadorByIdGeneroE(this.idGeneroE).subscribe(
      (data) => {
        this.jugadores = data;
        this.spinner.hide(); // Ocultar spinner después de obtener los datos
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
