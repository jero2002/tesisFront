import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTONotificacion, DTONotificacionEJ } from 'src/app/models/i-notificacion';
import { NotificacionService } from 'src/app/servicios/conectar/notificacion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
declare var alertify: any;

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

notificaciones:  DTONotificacion[] = [];
notificacionesej:  DTONotificacionEJ[] = [];
idJugador:number = 0;
idEquipo:number = 0;

constructor( private spinner: NgxSpinnerService, private notificacionservice: NotificacionService, private loginService:LoginService, private equiposervice:EquipoService) {

  const idJugadorLogueado = this.loginService.getIdJugador()?.idJugador;
  if (idJugadorLogueado !== undefined) {
     this.idJugador = idJugadorLogueado;
     this.idEquipo = idJugadorLogueado;
  }
}

  ngOnInit(): void {
    this.MostrarNotificacionEJ();
    this.MostrarNotificacionEquipo();
    console.log(this.loginService.getIdJugador()?.idJugador);
  }



 postJugador(idjugador:number, idNotificaciones:number){
 this.notificacionservice.postEquipoJugador(idjugador,this.idEquipo).subscribe({
  next: (resultado) => {  
  alertify.set('notifier', 'position', 'top-right');
  alertify.set('notifier','delay', 4);
  alertify.success("Se acepto la solicitud");   
  
  this.notificacionservice.DeleteNotificacion(idNotificaciones).subscribe({
    next: () => {      
    this.MostrarNotificacionEquipo()},
    error: (error) => { console.log(error); }
  })

},

  error: (error) => { console.log(error); }
})
}

postEquipo(idEquipo:number, idNotificaciones:number){
  this.notificacionservice.postEquipoJugador(this.idJugador,idEquipo).subscribe({
   next: (resultado) => {  
   alertify.set('notifier', 'position', 'top-right');
   alertify.set('notifier','delay', 4);
   alertify.success("Se acepto la solicitud");   
   
   this.notificacionservice.DeleteNotificacionEJ(idNotificaciones).subscribe({
    next: () => {  
    this.MostrarNotificacionEJ()},

    error: (error) => { console.log(error); }
  })
 
 },
 
   error: (error) => { console.log(error); }
 })
 
 }



  MostrarNotificacionEJ() {
    this.spinner.show();
    this.notificacionservice.getnotificacionjugador(this.idJugador).subscribe((data) => {
      this.notificacionesej = data; // Asignar el objeto del jugador a la variable
      this.spinner.hide();
    });
  }

  MostrarNotificacionEquipo() {
    this.spinner.show();
    this.notificacionservice.getnotificacionequipo(this.idEquipo).subscribe((data) => {
      this.notificaciones = data; // Asignar el objeto del jugador a la variable
      this.spinner.hide();
    });
  }

  eliminarNotEj(id:number){
    this.notificacionservice.DeleteNotificacionEJ(id).subscribe({
      next: (resultado) => {  
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error("Se rechazo la solicitud");   
      
      this.MostrarNotificacionEJ()},

      error: (error) => { console.log(error); }
    })
  }

  eliminarNot(id:number){
    this.notificacionservice.DeleteNotificacion(id).subscribe({
      next: (resultado) => {  
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error("Se rechazo la solicitud");   
      
      this.MostrarNotificacionEquipo()},

      error: (error) => { console.log(error); }
    })
  }


}
