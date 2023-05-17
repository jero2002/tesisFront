import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/servicios/login.service';
import { ReporteService } from 'src/app/servicios/reportes/reporte.service';
import { JugadorService } from 'src/app/servicios/servicioeyj/jugador.service';
declare var alertify: any;

@Component({
selector: 'app-reportes',
templateUrl: './reportes.component.html',
styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

data = [];
view: [number, number] = [700, 200];
gradient = false;
showLegend = true;
cantidad: number = 0;
cantidadJ: number = 0;
edad: number = 0;
reporteSeleccionado: string = 'jugadores'; // Agregado
reporteSeleccionadoC: string = 'edad'; 
idjugador:number = 0;

constructor(private reporteService: ReporteService, private spinner: NgxSpinnerService,  public loginService: LoginService, private jugadorervice: JugadorService) {

  const idJugadorLogueado = this.loginService.getIdJugador()?.idJugador;

  if (idJugadorLogueado !== undefined) {
    this.jugadorervice.GetJugadorById(idJugadorLogueado).subscribe(
      (data) => {
        this.idjugador = idJugadorLogueado;
        console.log(this.idjugador);
        this.cargarReporteC('edad');
       
      },
      (error) => {
        console.error(error);
      }
    );
  }


}

ngOnInit(): void {
this.cargarReporte('cantidad');
}

userHasRole(roles: number[]): boolean {
  return this.loginService.checkUseHasRole(roles);
}

cargarReporte(reporte: string): void { 
this.spinner.show();
this.reporteSeleccionado = reporte;
if (reporte === 'jugadores') {
this.reporteService.GetReporteJugadoresxProvincia().subscribe((reporte: any) => {
this.data = reporte.map((item: any) => ({ name: item.provincia, value: item.cantidadJugadores }));

});
this.spinner.hide();
} 

if (reporte === 'posiciones') {
  this.reporteService.GetReporteJugadoresxPosicion().subscribe((reporte: any) => {
    this.data = reporte.map((item: any) => ({ name: item.posicion, value: item.cantidadJugadores }));
    });
    
    this.spinner.hide();
}
if (reporte === 'cantidad'){
  this.reporteService.GetCantidadEquipos().subscribe((data) => {
    this.cantidad = data; 
  });
  this.reporteService.GetCantidadJugadores().subscribe((data) => {
    this.cantidadJ = data; 
  });
  this.spinner.hide();
}
}


cargarReporteC(reporte: string): void { 
  this.spinner.show();
  this.reporteSeleccionadoC = reporte;
  if (reporte === 'edad'){
    this.reporteService.GetEdadPromedio(this.idjugador).subscribe((data) => {
      this.edad = data; 
    });
  
    this.spinner.hide();
  }
  if (reporte === 'provincia') {
    this.reporteService.GetJugadoresPorProvincia(this.idjugador).subscribe(
      (reporte: any) => {
        this.data = reporte.map((item: any) => ({ name: item.provincia, value: item.cantidadJugadores }));
      },
      (error: any) => {
        alertify.set('notifier', 'position', 'top-right');
        alertify.set('notifier','delay', 4);
        alertify.error(error.error);
      }
    );
    this.spinner.hide();
  }
  
  if (reporte === 'estado') {
    this.reporteService.GetCantidadEquiposPorEstado(this.idjugador).subscribe(
      (reporte: any) => {
        this.data = reporte.map((item: any) => ({ name: item.nombreEstadoEquipo, value: item.cantidadEquipos }));
      },
      (error: any) => {
        
        alertify.set('notifier', 'position', 'top-right');
        alertify.set('notifier','delay', 4);
        alertify.error(error.error);
      }
    );
    this.spinner.hide();
  }
  
  }



onSelect(event: any) {
console.log(event);
}

}






