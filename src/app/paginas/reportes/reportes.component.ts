import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReporteService } from 'src/app/servicios/reportes/reporte.service';

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


reporteSeleccionado: string = 'jugadores'; // Agregado

constructor(private reporteService: ReporteService, private spinner: NgxSpinnerService) {}

ngOnInit(): void {
this.cargarReporte('jugadores'); // Modificado
}

cargarReporte(reporte: string): void { // Agregado
this.spinner.show();
this.reporteSeleccionado = reporte;
if (reporte === 'jugadores') {
this.reporteService.GetReporteJugadoresxProvincia().subscribe((reporte: any) => {
this.data = reporte.map((item: any) => ({ name: item.provincia, value: item.cantidadJugadores }));

});
this.spinner.hide();

} else if (reporte === 'posiciones') {
  this.reporteService.GetReporteJugadoresxPosicion().subscribe((reporte: any) => {
    this.data = reporte.map((item: any) => ({ name: item.posicion, value: item.cantidadJugadores }));
    });
    
    this.spinner.hide();
}
}

onSelect(event: any) {
console.log(event);
}

}






