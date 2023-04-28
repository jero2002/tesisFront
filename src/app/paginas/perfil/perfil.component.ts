import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {  Usuario, UsuarioDTOUpdate} from 'src/app/models/i-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { LoginService } from 'src/app/servicios/login.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';
declare var alertify: any;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  idUsuario: number = 0
  form!: FormGroup;
  usuario = {} as UsuarioDTOUpdate;
  

  constructor(private usuarioservice: UsuarioService,private formBuilder: FormBuilder,private params: ActivatedRoute,  private spinner: NgxSpinnerService,public loginservice: LoginService,private router: Router,private authservice: AuthService) { 
    this.idUsuario = this.params.snapshot.params["id"];
  }
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')],
      ],
      email: ['', [Validators.required, Validators.email ]]
    });
  
    this.usuarioservice.GetUsuarioByID(this.idUsuario).subscribe((data: any) => {
      this.usuario = data;
      this.form.patchValue({
        nombre: this.usuario.nombre,
        email: this.usuario.email,
      });
    }); // Agregar el paréntesis de cierre aquí
  
  
  }

  actualizarUsuario() {
    this.spinner.show();
    
    if (this.form.valid) {
      const usuario: UsuarioDTOUpdate = {
        idUsuario:this.usuario.idUsuario,
        email: this.form.value.email,
        contrasenia: this.usuario.contrasenia,
        nombre: this.form.value.nombre,
        rol: this.usuario.rol,
        idJugador:this.usuario.idJugador,
        idEquipo:this.usuario.idEquipo,
        token: this.usuario.token
      };
  
      this.usuarioservice.PutUsuario(usuario).subscribe((data) => {
        
        if(data.ok == false){

         this.spinner.hide();
         alertify.set('notifier', 'position', 'top-right');
         alertify.set('notifier','delay', 4);
         alertify.error(data.message); 


        }else {
          this.spinner.hide();
          alertify.set('notifier', 'position', 'top-right');
          alertify.set('notifier','delay', 4);
          alertify.success('Se actualizó el Usuario'); 
        }
      });
    }
  }
  
}
