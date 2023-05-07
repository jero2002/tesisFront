import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from 'src/app/servicios/login.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import Swal from 'sweetalert2';
import { DTONotificacion, DTONotificacionEJ } from 'src/app/models/i-notificacion';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificacionService } from 'src/app/servicios/conectar/notificacion.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeinout', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(500)]),
      transition(':leave', animate(500, style({ opacity: 0 }))),
    ]),
  ],
})
export class SidenavComponent implements OnInit {
  isRotated: boolean = false;
  isloggedIn: boolean = false;
  private Subscription = new Subscription();
  mobileQuery: MediaQueryList;

  notificaciones:  DTONotificacion[] = [];
  notificacionesej:  DTONotificacionEJ[] = [];
  notificacionesDisponibles = false;

  private _mobileQueryListener: () => void;

  constructor(
    public loginService: LoginService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: Router,
    private authService: AuthService,
    private spinner: NgxSpinnerService, 
    private notificacionservice: NotificacionService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  
  
  }



  ngOnInit(): void {
   
    this.Subscription.add(
      this.loginService.isLoggedIn.subscribe((data) => {
        this.isloggedIn = data;
        
        setTimeout(() => {
          this.authService.isLoggedIn.subscribe(
            (data) => {
              this.isloggedIn = data;
            },
            (error) => {
              console.log('Error:', error);
            }
          );
        });
      })
    );
  
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.Subscription.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }

  
  userHasRole(roles: number[]): boolean {
    return this.loginService.checkUseHasRole(roles);
  }

  desloguear(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      background:"#99749f",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      customClass: {
        title: 'text-white',
      }
    }).then((result) => {
      if (result.value) {
        this.loginService.desloguearUsuario();
        this.route.navigate(['/paginas/login']);
      }
    });
}


  Vperfiljugador() {
    const idJugador = this.loginService.getIdJugador()?.idJugador;
    if (idJugador !== null) {
      this.route.navigate([`/paginas/perfiljugador/${idJugador}`]);
    } else {
      this.route.navigate(['/paginas/crearperfilJ']);
    }
  }

  Vperfil() {
    const idusuario = this.loginService.getIdJugador()?.idUsuario;
    if (idusuario !== null) {
      this.route.navigate([`/paginas/perfil/${idusuario}`]);
    } else {
      this.route.navigate(['**']);
    }
  }
  

Vperfilequipo() {
  const idEquipo = this.loginService.getIdJugador()?.idEquipo;
  if (idEquipo !== null) {
    this.route.navigate([`/paginas/perfilequipo/${idEquipo}`]);
  } else {
    this.route.navigate(['/paginas/crearperfilC']);
  }
}

}
