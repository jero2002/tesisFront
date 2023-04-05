import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { LoginService } from "./login.service";
import Swal from "sweetalert2";


@Injectable({
    providedIn: 'root'
  })
  
  export class GuardAuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router) { }
  
    canActivate(route: ActivatedRouteSnapshot): boolean {
      if (this.loginService.usuarioLogueado()) {
        if (!this.loginService.checkCanLoad(route.data['roles'])) {
          this.displayErrors("¡Usted no tiene los permisos necesarios para acceder a esta sección del sitio!", "Error");
        this.router.navigate(['paginas/principal']);
        }
        return true;
      }
      this.displayErrors("¡Para acceder a esta función debe iniciarse sesión!", "Error");
      this.router.navigate(['']);
      return false;
    }

    displayErrors(errorMessage: string, title: string): void {
      Swal.fire({ text: errorMessage, confirmButtonColor: "#2c5672" });
    }
  }