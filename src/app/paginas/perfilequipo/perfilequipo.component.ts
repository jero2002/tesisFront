import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTOEquipo } from 'src/app/models/i-equipo';
import { Estadoe } from 'src/app/models/i-estadoe';
import { Generoe } from 'src/app/models/i-generoe';
import { Provincia } from 'src/app/models/i-provincia';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import Swal from 'sweetalert2';
declare var alertify: any;


@Component({
  selector: 'app-perfilequipo',
  templateUrl: './perfilequipo.component.html',
  styleUrls: ['./perfilequipo.component.css']
})
export class PerfilequipoComponent {
  idEquipo: number = 0
  equipo = {} as DTOEquipo;
  form!: FormGroup;
  estado: Estadoe[] = [];
  genero: Generoe[] = [];
  provincia: Provincia[] = [];
  

  constructor(private formBuilder: FormBuilder,private params: ActivatedRoute,public loginService: LoginService,  private spinner: NgxSpinnerService,private equiposervice: EquipoService,private router: Router,private authservice: AuthService) { 
    this.idEquipo = this.params.snapshot.params["id"];
  }

  ngOnInit(): void {
   
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')],
      ],
      celular: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$'),Validators.maxLength(15) ]],
      torneoGanado:['',[Validators.required, Validators.pattern('^[0-9]+$') ] ],
      entrenador:['', [Validators.required,  Validators.pattern('[a-zA-Z ]{2,254}')]],
      idEstadoE: ['', [Validators.required]],
      idGeneroE: ['', [Validators.required]],
      idProvincia: ['', [Validators.required]]
    
    });

    this.equiposervice.GetEquipoById(this.idEquipo).subscribe((data: any) => {
      this.equipo = data;
      this.form.patchValue({
        nombre: this.equipo.nombre,
        celular: this.equipo.celular,
        torneoGanado: this.equipo.torneoGanado,
        entrenador: this.equipo.entrenador,
        idEstadoE: this.equipo.idEstadoE,
        idGeneroE: this.equipo.idGeneroE,
        idProvincia: this.equipo.idProvincia,
      });
      this.CargarSelects();
    }); 

  }
  actualizarEquipo() {
    this.spinner.show();
    
    if (this.form.valid) {
      const equipo: DTOEquipo = {
        idEquipo: this.equipo.idEquipo,
        nombre: this.form.value.nombre,
        celular: this.form.value.celular,
        torneoGanado: this.form.value.torneoGanado,
        entrenador: this.form.value.entrenador,
        idEstadoE: this.form.value.idEstadoE,
        idGeneroE: this.form.value.idGeneroE,
        idProvincia: this.form.value.idProvincia,
       
      };
  
      this.equiposervice.PutEquipo(equipo).subscribe({
        next: () => {

          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success('Se actualizó el Equipo');
          this.spinner.hide();
        },
        error: (e: any) => console.log(e)
      });
    }
  }



  CargarSelects() {
    this.equiposervice.GetEstadoE().subscribe({
      next: (resultado: any) => { this.estado = resultado; this.form.patchValue({ idEstadoJ: this.equipo.idEstadoE }); },
      error: (e: any) => (console.log(e.error))
    })
    this.equiposervice.GetGeneroE().subscribe({
      next: (resultado: any) => { this.genero = resultado; this.form.patchValue({ idGenero: this.equipo.idGeneroE }); },
      error: (e: any) => (console.log(e.error))
    })
    this.equiposervice.GetProvincias().subscribe({
      next: (resultado: any) => { this.provincia = resultado; this.form.patchValue({ idPosicion: this.equipo.idProvincia}); },
      error: (e: any) => (console.log(e.error))
    })
  }



  limpiarInputs() {
    this.form.reset(); // Limpia los valores de los inputs en el formulario
  }
}
