import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/models/i-login';
import { LoginService } from 'src/app/servicios/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup
  changeType: boolean = true;
  visible: boolean = true;
  private Subscription = new Subscription();
  log = {} as Login;

  constructor(private formBuilder: FormBuilder,  private api: LoginService , private router: Router, private http: HttpClient,
    private spinner: NgxSpinnerService) {


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  
  }

  registrarse() {
    this.router.navigate(["/paginas/registro"])
  }

  login() {
    this.spinner.show();
    const login: Login = {
      email: this.loginForm.get('email')?.value,
      contrasenia: this.loginForm.get('contrasenia')?.value,
      idUsuario:0,
      nombre: "",
      rol: 0,
      token: "",
      idJugador: 0 ,
      idEquipo: 0,
      message: "",     
      ok: false,
      error: "",
      codigoEstado: 1
    };
    console.log(login);
    this.Subscription.add(
      this.api.postLogin(login).subscribe(next => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: `Bienvenido`,
          confirmButtonColor: 'linear-gradient(to bottom right, #51085c, rgb(35, 34, 34))',
          text: 'Sesión Iniciada...',
          timer: 5000
        }).then(x => {
          if (this.api.checkUseHasRole([1,2])) { 
            this.router.navigate(["paginas/principal"]);
          } else {
            Swal.fire({
              title: "¡Cuidado!",
              text: "Usted no tiene permisos, contactese con el area de soporte"
            })
            this.router.navigate([""]);
          }
        });
      }, error => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Ups!',
          text: 'Contraseña o Email incorrectos',
          confirmButtonColor: 'linear-gradient(to bottom right, #51085c, rgb(35, 34, 34))'
        });
      })
    );
  }

  viewpass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
