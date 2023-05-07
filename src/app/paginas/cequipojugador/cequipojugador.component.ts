import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTOJugador, DTOJugadorByGenero, Jugador } from 'src/app/models/i-jugador';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaService } from 'src/app/servicios/conectar/lista.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import { Observable } from 'rxjs';
import { JugadorService } from 'src/app/servicios/servicioeyj/jugador.service';
import { NotificacionService } from 'src/app/servicios/conectar/notificacion.service';
declare var alertify: any;

@Component({
  selector: 'app-cequipojugador',
  templateUrl: './cequipojugador.component.html',
  styleUrls: ['./cequipojugador.component.css']
})
export class CequipojugadorComponent implements OnInit {

  idGeneroE: number = 0; // Declarar la variable aquí
  idEquipo: number = 0;
  jugadores: DTOJugadorByGenero[] = [];
  jugadoresOriginal: DTOJugadorByGenero[] = [];
  jugador = {} as Jugador;

  @ViewChild('abrirModeljugadorBtn') abrirModeljugadorBtn: any;
  @ViewChild('cerrarjugadorModalBtn') cerrarjugadorModalBtn: any;

  

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private equiposervice: EquipoService,
    private jugadoreservice: JugadorService,
    private listaservice: ListaService,
    private spinner: NgxSpinnerService,
    private notificacions: NotificacionService
  ) {

    const idEquipoLogueado = this.loginService.getIdJugador()?.idEquipo;
    if (idEquipoLogueado !== undefined) {
      this.equiposervice.GetEquipoById(idEquipoLogueado).subscribe(
        (data) => {
          this.idGeneroE = data.idGeneroE;
          this.idEquipo = idEquipoLogueado;
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

  CrearNotificacionEquipoJugador(id:number) {
    this.notificacions.postNotificacionEquipoxJugador(this.idEquipo,id).subscribe({
      next: (resultado: any) => {
        if(resultado.ok == true){
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success(resultado.message);
        } else {
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.error(resultado.message);
        }
      },
      error: (e: any) => { console.log(e); }
    }); 
}

  cargarJugador() {
    this.spinner.show();
    this.listaservice.GetJugadorByIdGeneroE(this.idGeneroE).subscribe(
      (data) => {
        this.jugadores = data;
        this.jugadoresOriginal = data;
        this.spinner.hide(); // Ocultar spinner después de obtener los datos
      },
      (error) => {
        console.error(error);
      }
    );
  }

  Mostrar(id: number) {
    this.abrirModal();
    this.spinner.show();
    this.jugadoreservice.GetJugadorById(id).subscribe((data) => {
      this.jugador = data; // Asignar el objeto del jugador a la variable
      console.log(this.jugador);
      this.spinner.hide();
    });
  }

  

  abrirModal(): void {
    this.abrirModeljugadorBtn.nativeElement.click();
  }
  
  cerrarModal(): void {
    this.cerrarjugadorModalBtn.nativeElement.click();
  }
 
  filtrarJugadores(event: Event) {
 
    const valor = (event.target as HTMLInputElement).value;
    this.jugadores = this.jugadoresOriginal.filter(jugador => {
        const nombreCumple = jugador.nombre.toLowerCase().includes(valor.toLowerCase());
        const provinciaCumple = jugador.idProvinciaNavigation.nombre.toLowerCase().includes(valor.toLowerCase());
        const posicionCumple = jugador.idPosicionNavigation.nombre.toLowerCase().includes(valor.toLowerCase());
        const edadCumple = jugador.edad.toString().includes(valor);
      
        return nombreCumple || provinciaCumple || edadCumple || posicionCumple;
    });
}


}
