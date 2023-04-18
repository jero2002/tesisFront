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

  private _mobileQueryListener: () => void;

  constructor(
    public loginService: LoginService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: Router,
    private authService: AuthService
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
    this.loginService.desloguearUsuario();
    this.route.navigate(['/paginas/login']);
 
  }

  Vperfiljugador() {
    const idJugador = this.loginService.getIdJugador()?.idJugador;
    if (idJugador !== null) {
      this.route.navigate([`/paginas/perfiljugador/${idJugador}`]);
    } else {
      this.route.navigate(['/paginas/crearperfilJ']);
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
