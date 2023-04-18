import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
declare var alertify: any;

@Component({
  selector: 'app-conectar',
  templateUrl: './conectar.component.html',
  styleUrls: ['./conectar.component.css']
})
export class ConectarComponent {

  constructor(
    public loginService: LoginService,

    private route: Router,
   
  ) {}

  ngOnInit(): void {
  }

  vVerjugadores() {
    const idEquipo = this.loginService.getIdJugador()?.idEquipo;
    if (idEquipo !== null) {
      this.route.navigate([`/paginas/cequipojugador`]);
    } else {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 5);
      alertify.warning('Primero crea un perfil de equipo', 'my-custom-class');

      this.route.navigate(['/paginas/crearperfilC']);
    }
  }

  vVerEquipos() {
    const idJugador = this.loginService.getIdJugador()?.idJugador;
    if (idJugador !== null) {
      this.route.navigate([`/paginas/cjugadorequipo`]);
    } else {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 5);
      alertify.warning('Primero crea un perfil de jugador');

      this.route.navigate(['/paginas/crearperfilJ']);
    }
  }



}
