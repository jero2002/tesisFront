import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SidenavComponent} from './layout/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PrincipalComponent } from './paginas/principal/principal.component';
import localeEs from '@angular/common/locales/es-AR';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { MenuComponent } from './paginas/inicio/menu/menu.component';
import { LoginComponent } from './paginas/inicio/login/login.component';
import { RegistroComponent } from './paginas/inicio/registro/registro.component';
import { ConectarComponent } from './paginas/conectar/conectar.component';
import { PerfilequipoComponent } from './paginas/perfilequipo/perfilequipo.component';
import { PerfiljugadorComponent } from './paginas/perfiljugador/perfiljugador.component';
import { SolicitudComponent } from './paginas/solicitud/solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportesComponent } from './paginas/reportes/reportes.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTooltipModule} from '@angular/material/tooltip';
import { JwtModule } from '@auth0/angular-jwt';
import { registerLocaleData } from '@angular/common';
import { LoginService } from './servicios/login.service';
import { TerminosycondicionesComponent } from './paginas/formalidades/terminosycondiciones/terminosycondiciones.component';
import { PoliticasComponent } from './paginas/formalidades/politicas/politicas.component';
import { ContactoComponent } from './paginas/formalidades/contacto/contacto.component';
import { CrearperfiljComponent } from './paginas/crearperfilj/crearperfilj.component';
import { CrearperfilcComponent } from './paginas/crearperfilc/crearperfilc.component';
import { AuthService } from './servicios/auth.service';
import { CjugadorequipoComponent } from './paginas/cjugadorequipo/cjugadorequipo.component';
import { CequipojugadorComponent } from './paginas/cequipojugador/cequipojugador.component';
import {MatCardModule} from '@angular/material/card';
import { NgxChartsModule } from '@swimlane/ngx-charts';



registerLocaleData(localeEs, 'es-AR');
export function tokenGetter() {
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    
    AppComponent,
    SidenavComponent,
    PrincipalComponent,
    PerfilComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    ConectarComponent,
    PerfilequipoComponent,
    PerfiljugadorComponent,
    SolicitudComponent,
    ReportesComponent,
    TerminosycondicionesComponent,
    PoliticasComponent,
    ContactoComponent,
    CrearperfiljComponent,
    CrearperfilcComponent,
    CjugadorequipoComponent,
    CequipojugadorComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatTooltipModule,
    MatCardModule,
    NgxChartsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:7095', 'http://localhost:5289'],   //wtf con esto
        disallowedRoutes: ['https://localhost:7095/api/Login/PostLogin','https://localhost:7095/api/Register/PostRegister', 'http://localhost:5289/api/Login/PostLogin','http://localhost:5289/api/Login/PostLogin']
      }
    }),
    
  ],
  providers: [ LoginService,AuthService, { provide: LOCALE_ID, useValue: 'es-AR' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class AppModule { }
