import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Estadoj } from 'src/app/models/i-estadoj';
import { Genero } from 'src/app/models/i-generoj';
import { Posicion } from 'src/app/models/i-posicion';
import { Provincia } from 'src/app/models/i-provincia';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginService } from 'src/app/servicios/login.service';
import { JugadorService } from 'src/app/servicios/servicioeyj/jugador.service';
import Swal from 'sweetalert2';
declare var alertify: any;

@Component({
  selector: 'app-crearperfilj',
  templateUrl: './crearperfilj.component.html',
  styleUrls: ['./crearperfilj.component.css']
})
export class CrearperfiljComponent implements OnInit {
  form!: FormGroup;
  provincia: Provincia[] = [];
  posicion:Posicion[]=[];
  estadoj:Estadoj[]=[];
  genero:Genero[]=[];

  constructor(private formBuilder: FormBuilder,public loginService: LoginService,  private spinner: NgxSpinnerService,private router: Router,private authservice: AuthService, private jugadorservice:JugadorService) { 
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')],
      ],
      celular: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$'),Validators.maxLength(15) ]],
      edad:['',[Validators.required, Validators.pattern('^[0-9]+$') ] ],
      descripcion:['', [Validators.required,  Validators.pattern('^[a-zA-Z ]{2,254}$'),Validators.maxLength(30)]],
      idPosicion: ['', [Validators.required]],
      idEstadoJ: ['', [Validators.required]],
      idProvincia: ['', [Validators.required]],
      idGenero: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  this.CargarSelects();
  }

  CargarSelects(){
    this.spinner.show();
    this.jugadorservice.GetEstadoJ().subscribe({
      next: (resultado: any) => { this.estadoj = resultado; this.spinner.hide(); },
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
    this.jugadorservice.GetGenero().subscribe({
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
    this.jugadorservice.GetProvincias().subscribe({
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
    this.jugadorservice.GetPosicion().subscribe({
      next: (resultado: any) => { this.posicion = resultado; this.spinner.hide(); },
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

  CrearJ() {
  
    if (this.form.valid) {
      const jugador = this.form.value;
      this.jugadorservice.PostRegistroJ(jugador).subscribe({
        next: (resultado: any) => {
   
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success(resultado.message);

          this.spinner.show();
          this.loginService.updateCurrentUserInLocalStorage(); // Llama al método para actualizar el usuario en el localStorage
       
       
          setTimeout(() => {
            const idJugador = this.loginService.getIdJugador()?.idJugador;
            this.router.navigate([`paginas/perfiljugador/${idJugador}`]);
            this.spinner.hide();
          }, 500); // Espera un segundo antes de navegar a la página de perfil del jugador
        },
        error: (e: any) => { alert(e.error); console.log(e); }
      });
    }
  }
  
  

  limpiarInputs() {
    this.form.reset(); // Limpia los valores de los inputs en el formulario
  }


}
