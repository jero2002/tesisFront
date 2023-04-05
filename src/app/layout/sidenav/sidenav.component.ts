import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  isloggedIn:boolean=false;
  private Subscription = new Subscription();
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    public loginService: LoginService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private route: Router,
    
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
      this.Subscription.unsubscribe();
      
  }

  ngOnInit(): void {
  this.loginService.isLoggedIn.subscribe(data => this.isloggedIn = data  );
  }

  userHasRole(roles: number[]): boolean {
    return this.loginService.checkUseHasRole(roles);
  }

  desloguear(): void {
    this.loginService.desloguearUsuario();

    

 /*  setTimeout(() => {
    this.route.navigate(['/paginas/login']);
    }, 1000); */
  }

  Vperfiljugador() {
    if (this.loginService.getIdJugador()?.idJugador !== null) {
      this.route.navigate(['/paginas/perfiljugador']);
    } else {
      this.route.navigate(['/paginas/crearperfilJ']);
    }
  }

  Vperfilequipo() {
    if (this.loginService.getIdJugador()?.idEquipo !== null) {
      this.route.navigate(['/paginas/perfilequipo']);
    } else {
      this.route.navigate(['/paginas/crearperfilC']);
    }
  }
}
