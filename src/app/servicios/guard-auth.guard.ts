import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class GuardAuthGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {
    
  }
  

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const url = route.routeConfig?.path;
    const idJugadorLogueado = this.loginService.getIdJugador()?.idJugador;
    const idEquipoLogueado = this.loginService.getIdJugador()?.idEquipo;
    const idJugadorEnUrl = route.params['id'];
    const idEquipoEnUrl = route.params['id'];

    const idJugadorL = this.loginService.getIdJugador()?.idJugador;
    const idEquipoL = this.loginService.getIdJugador()?.idEquipo;

    

    if (!this.loginService.usuarioLogueado()) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error('¡Para acceder a esta función debe iniciarse sesión!');

      
      this.router.navigate(['']);
      return false;
    }

    if (!this.loginService.checkCanLoad(route.data['roles'])) {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error('¡Usted no tiene los permisos necesarios para acceder a esta sección del sitio!');

      this.router.navigate(['paginas/principal']);
      return false;
    }

    if (url === 'paginas/perfiljugador/:id' && idJugadorLogueado != idJugadorEnUrl) {
      alertify.dismissAll(); 
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error('Solo puedes modificar tu jugador');
      this.router.navigate([`paginas/perfiljugador/${idJugadorLogueado}`]);
      return false;
    }

    if (url === 'paginas/perfilequipo/:id' && idEquipoLogueado != idEquipoEnUrl) {
      alertify.dismissAll(); // cancela todas las alertas activas antes de mostrar una nueva
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier', 'delay', 4);
      alertify.error('Solo puedes modificar tu equipo');
      this.router.navigate([`paginas/perfilequipo/${idEquipoLogueado}`]);
      return false;
    }
    

    if (idJugadorLogueado !== null && url === 'paginas/crearperfilJ') {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);                                       //Primero undefined
      alertify.error('Ya tienes un jugador, no puedes crear otro');
      this.router.navigate([`paginas/principal`]);
      return false;
    }
    
    if (idEquipoLogueado !== null && url === 'paginas/crearperfilC') {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error('Ya tienes un equipo, no puedes crear otro');           //Primero undefined

      this.router.navigate([`paginas/principal`]); 
      return false;
    }   

    if (!idEquipoL && url === 'paginas/cequipojugador') {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);                              //Primero undefined
      alertify.error('Primero crea un equipo');
    
      this.router.navigate(['paginas/crearperfilC']);
    }
    
    if (!idJugadorL && url === 'paginas/cjugadorequipo') {
      alertify.set('notifier', 'position', 'top-right');
      alertify.set('notifier','delay', 4);
      alertify.error('Primero crea un jugador');                        //Primero undefined
    
      this.router.navigate(['paginas/crearperfilJ']);
    }


  

    return true;
  }

  displayErrors(errorMessage: string, title: string): void {
    Swal.fire({ text: errorMessage, confirmButtonColor: '#2c5672' });
  }
}
