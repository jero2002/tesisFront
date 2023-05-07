import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTOEquipoByGenero, Equipo } from 'src/app/models/i-equipo';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaService } from 'src/app/servicios/conectar/lista.service';
import { NotificacionService } from 'src/app/servicios/conectar/notificacion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import { JugadorService } from 'src/app/servicios/servicioeyj/jugador.service';
declare var alertify: any;

@Component({
  selector: 'app-cjugadorequipo',
  templateUrl: './cjugadorequipo.component.html',
  styleUrls: ['./cjugadorequipo.component.css']
})
export class CjugadorequipoComponent implements OnInit {

  idGeneroJ: number = 0; // Declarar la variable aquí
  idjugador: number = 0;

  equipos: DTOEquipoByGenero[] = [];
  equipo = {} as Equipo;
  equipoOriginal: DTOEquipoByGenero[] = [];

  @ViewChild('abrirModeljugadorBtn') abrirModeljugadorBtn: any;
  @ViewChild('cerrarjugadorModalBtn') cerrarjugadorModalBtn: any;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
    private equiposervice: EquipoService,
    private jugadorervice: JugadorService,
    private listaservice: ListaService,
    private spinner: NgxSpinnerService,
    private notificacions: NotificacionService
  ) {

    const idJugadorLogueado = this.loginService.getIdJugador()?.idJugador;

    if (idJugadorLogueado !== undefined) {
      this.jugadorervice.GetJugadorById(idJugadorLogueado).subscribe(
        (data) => {
          this.idGeneroJ = data.idGenero;
          this.idjugador = idJugadorLogueado;
          this.cargarEquipo(); // Llamar a cargarJugador() después de obtener idGeneroE
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }




  ngOnInit(): void {
  console.log(this.loginService.getIdJugador()?.idJugador);
  }

  CrearNotificacionJugadorEquipo(id:number) {
      this.notificacions.postNotificacionJugadorxEquipo(this.idjugador,id).subscribe({
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





  cargarEquipo() {
    this.spinner.show();
    this.listaservice.GetEquipoByIdGeneroJ(this.idGeneroJ).subscribe(
      (data) => {
        this.equipos = data;
        this.equipoOriginal =data;
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
    this.equiposervice.GetEquipoById(id).subscribe((data) => {
      this.equipo = data; // Asignar el objeto del jugador a la variable
      console.log(this.equipo);
      this.spinner.hide();
    });
  }

  filtrarEquipo(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.equipos = this.equipoOriginal.filter(equipo => {
        const nombreCumple = equipo.nombre.toLowerCase().includes(valor.toLowerCase());
        const provinciaCumple = equipo.idProvinciaNavigation.nombre.toLowerCase().includes(valor.toLowerCase());
        const entrenadorCumple = equipo.entrenador.toLowerCase().includes(valor.toLowerCase());
        const torneoCumple = equipo.torneoGanado.toString().includes(valor);
        return nombreCumple || provinciaCumple || entrenadorCumple || torneoCumple;
    });
}


  abrirModal(): void {
    this.abrirModeljugadorBtn.nativeElement.click();
  }
  
  cerrarModal(): void {
    this.cerrarjugadorModalBtn.nativeElement.click();
  }

  

}
