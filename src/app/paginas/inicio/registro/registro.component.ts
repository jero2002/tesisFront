import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/i-usuario';
import { RegistoService } from 'src/app/servicios/registro.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var alertify: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  form!: FormGroup;
  visible : boolean = true;
  changeType: boolean = true;
  usuario!: Usuario;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servicio: RegistoService,
    private spinner: NgxSpinnerService,
   
   
  ){
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(5)]],
      contraseniaC: ['', [Validators.required]],
      terminos:[false, [Validators.requiredTrue]]
    });
  }
  ngOnInit(): void {
 console.log("registrar");
  }

  agregar() {
    this.spinner.show();
    const usuario: Usuario = {
      nombre: this.form.get('nombre')?.value,
      email: this.form.get('email')?.value,
      contrasenia: this.form.get('contrasenia')?.value,
    };

    this.servicio.PostRegistro(usuario).subscribe((data) => {
      if (data.error) {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Cuidado...',
          confirmButtonColor: 'linear-gradient(to bottom right, #51085c, rgb(35, 34, 34))',
          text: data.error,
        });
      } else {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Perfecto...',
          text: 'Se registró con éxito',
          confirmButtonColor: 'linear-gradient(to bottom right, #51085c, rgb(35, 34, 34))'
        }).then(() => { 
         this.router.navigate(["paginas/login"]);
        });
      }
    });
  }


  viewpass(){
    this.visible = !this.visible;
    this.changeType= !this.changeType;
  }

  validar() {
    if (this.form.value.contrasenia != this.form.value.contraseniaC) {
      Swal.fire({
        icon: 'error',
        title: 'Cuidado...',
        text: 'Las contraseñas no coinciden',
      });

    
    } else {
      this.agregar();
    }
  }

  
}
