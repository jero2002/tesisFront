import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Estadoe } from 'src/app/models/i-estadoe';
import { Generoe } from 'src/app/models/i-generoe';
import { Provincia } from 'src/app/models/i-provincia';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import Swal from 'sweetalert2';
declare var alertify: any;

@Component({
  selector: 'app-crearperfilc',
  templateUrl: './crearperfilc.component.html',
  styleUrls: ['./crearperfilc.component.css']
})
export class CrearperfilcComponent implements OnInit {

  form!: FormGroup;
  estado: Estadoe[] = [];
  genero: Generoe[] = [];
  provincia: Provincia[] = [];
  

  constructor(private formBuilder: FormBuilder,public loginService: LoginService,  private spinner: NgxSpinnerService,private equiposervice: EquipoService,private router: Router,private authservice: AuthService) { 
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
  }

  ngOnInit(): void {
   this.CargarSelects();
  }

  CargarSelects(){
    this.spinner.show();
    this.equiposervice.GetEstadoE().subscribe({
      next: (resultado: any) => { this.estado = resultado; this.spinner.hide(); },
      error: (e: any) => {
        Swal.fire({
          title: "¡Error!",
          text: e.error,
          confirmButtonColor: '#2c5672'
        });
      this.spinner.hide();
      }
    })
    this.spinner.show();
    this.equiposervice.GetGeneroE().subscribe({
      next: (resultado: any) => { this.genero = resultado; this.spinner.hide(); },
      error: (e: any) => {
        Swal.fire({
          title: "¡Error!",
          text: e.error,
          confirmButtonColor: '#2c5672'
        });
      this.spinner.hide();
      }
    })
    this.spinner.show();
    this.equiposervice.GetProvincias().subscribe({
      next: (resultado: any) => { this.provincia = resultado; this.spinner.hide(); },
      error: (e: any) => {
        Swal.fire({
          title: "¡Error!",
          text: e.error,
          confirmButtonColor: '#2c5672'
        });
      this.spinner.hide();
      }
    })
  }

  CrearE() {
    this.spinner.show();
    if (this.form.valid) {
      const equipo = this.form.value;
      this.equiposervice.PostRegistroE(equipo).subscribe({
        next: (resultado: any) => {
          
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success(resultado.message);

          this.spinner.show();
          this.loginService.updateCurrentUserInLocalStorage(); // Llama al método para actualizar el usuario en el localStorage
       
         
          setTimeout(() => {
            
            const idEquipo = this.loginService.getIdJugador()?.idEquipo;
            this.router.navigate([`paginas/perfilequipo/${idEquipo}`]);
            this.spinner.hide();
  
          }, 500); // Espera un segundo antes de navegar a la página de perfil del equipo
        },
        error: (e: any) => { alert(e.error); console.log(e); }
      });
    }
  }
  
  limpiarInputs() {
    this.form.reset(); // Limpia los valores de los inputs en el formulario
  }


}
