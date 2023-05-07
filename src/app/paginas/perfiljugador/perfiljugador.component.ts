import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DTOEquipo, DTOEquipoByGenero, DTOEquiposjugador } from 'src/app/models/i-equipo';
import { Estadoj } from 'src/app/models/i-estadoj';
import { Genero } from 'src/app/models/i-generoj';
import { DTOJugador } from 'src/app/models/i-jugador';
import { Posicion } from 'src/app/models/i-posicion';
import { Provincia } from 'src/app/models/i-provincia';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginService } from 'src/app/servicios/login.service';
import { EquipoService } from 'src/app/servicios/servicioeyj/equipo.service';
import { JugadorService } from 'src/app/servicios/servicioeyj/jugador.service';
import Swal from 'sweetalert2';
declare var alertify: any;

@Component({
  selector: 'app-perfiljugador',
  templateUrl: './perfiljugador.component.html',
  styleUrls: ['./perfiljugador.component.css']
})
export class PerfiljugadorComponent {
  equipos: DTOEquiposjugador[] = [];
  idJugador: number = 0
  jugador = {} as DTOJugador;
  form!: FormGroup;
  provincia: Provincia[] = [];
  posicion:Posicion[]=[];
  estadoj:Estadoj[]=[];
  genero:Genero[]=[];

  constructor(private formBuilder: FormBuilder, private params: ActivatedRoute,public loginService: LoginService,  private spinner: NgxSpinnerService,private router: Router,private authservice: AuthService, private jugadorservice:JugadorService, private equiposervice:EquipoService) { 
    this.idJugador = this.params.snapshot.params["id"];   
  }

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')],
      ],
      celular: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$'),Validators.maxLength(15) ]],
      edad:['',[Validators.required, Validators.pattern('^[0-9]+$') ] ],
      descripcion:['', [Validators.required,  Validators.pattern('^[a-zA-Z ]{2,254}$'), Validators.maxLength(30)]],
      idPosicion: ['', [Validators.required]],
      idEstadoJ: ['', [Validators.required]],
      idProvincia: ['', [Validators.required]],
      idGenero: ['', [Validators.required]]
    });

    this.jugadorservice.GetJugadorById(this.idJugador).subscribe((data: any) => {
      this.jugador = data;
      this.form.patchValue({
        nombre: this.jugador.nombre,
        celular: this.jugador.celular,
        edad: this.jugador.edad,
        descripcion: this.jugador.descripcion,
        idPosicion: this.jugador.idPosicion,
        idEstadoJ: this.jugador.idEstadoJ,
        idProvincia: this.jugador.idProvincia,
        idGenero: this.jugador.idGenero
      });
      this.CargarSelects();
    });   


      this.cargarEquiposDelJugador();
    
  }

  actualizarJugador() {
    if (this.form.valid) {
      const jugador: DTOJugador = {
        idJugador: this.jugador.idJugador,
        nombre: this.form.value.nombre,
        celular: this.form.value.celular,
        edad: this.form.value.edad,
        descripcion: this.form.value.descripcion,
        idPosicion: this.form.value.idPosicion,
        idEstadoJ: this.form.value.idEstadoJ,
        idProvincia: this.form.value.idProvincia,
        idGenero: this.form.value.idGenero
      };
   
      this.jugadorservice.PutJugador(jugador).subscribe({
        next: () => {
    
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success('Se actualizó el jugador');
        },
        error: (e: any) => console.log(e)
      });
    }
  }
 
  cargarEquiposDelJugador() {
    this.spinner.show();
    this.equiposervice.GetEquiposjugador(this.idJugador).subscribe(
      (data) => {
        this.equipos = data;
        console.log(this.equipos); // Mostrar equipos en la consola después de obtener los datos
        this.spinner.hide(); // Ocultar spinner después de obtener los datos
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  


  CargarSelects() {
    this.jugadorservice.GetEstadoJ().subscribe({
      next: (resultado: any) => { this.estadoj = resultado; this.form.patchValue({ idEstadoJ: this.jugador.idEstadoJ }); },
      error: (e: any) => (console.log(e.error))
    })
    this.jugadorservice.GetGenero().subscribe({
      next: (resultado: any) => { this.genero = resultado; this.form.patchValue({ idGenero: this.jugador.idGenero }); },
      error: (e: any) => (console.log(e.error))
    })
    this.jugadorservice.GetPosicion().subscribe({
      next: (resultado: any) => { this.posicion = resultado; this.form.patchValue({ idPosicion: this.jugador.idPosicion }); },
      error: (e: any) => (console.log(e.error))
    })
    this.jugadorservice.GetProvincias().subscribe({
      next: (resultado: any) => { this.provincia = resultado; this.form.patchValue({ idProvincia: this.jugador.idProvincia }); },
      error: (e: any) => (console.log(e.error))
    })
  }
  
  
  eliminar(id: number) {
    Swal.fire({
      title: '¿Deseas irte del equipo?',
      background:"#99749f",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#2d0233",
      confirmButtonColor: "#dc3545",
      icon: "warning",
      denyButtonText: 'No',
      customClass: {
        title: 'text-white',
        actions: 'my-actions',
        cancelButton: 'order-2 right-gap',
        confirmButton: 'order-1',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.jugadorservice.DeleteEquipoJugador(id).subscribe({
          next: (resultado) => { Swal.fire('Te fuiste del equipo!', '', 'success'), this.cargarEquiposDelJugador()},
          error: (error) => { console.log(error); }
        })

      } else if (result.isDenied) {

      }
    })

  }


  limpiarInputs() {
    this.form.reset(); // Limpia los valores de los inputs en el formulario
  }
}
