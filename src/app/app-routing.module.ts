import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConectarComponent } from './paginas/conectar/conectar.component';
import { LoginComponent } from './paginas/inicio/login/login.component';
import { MenuComponent } from './paginas/inicio/menu/menu.component';
import { RegistroComponent } from './paginas/inicio/registro/registro.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { PerfilequipoComponent } from './paginas/perfilequipo/perfilequipo.component';
import { PerfiljugadorComponent } from './paginas/perfiljugador/perfiljugador.component';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { ReportesComponent } from './paginas/reportes/reportes.component';
import { SolicitudComponent } from './paginas/solicitud/solicitud.component';
import { GuardAuthGuard } from './servicios/guard-auth.guard';
import { TerminosycondicionesComponent } from './paginas/formalidades/terminosycondiciones/terminosycondiciones.component';
import { PoliticasComponent } from './paginas/formalidades/politicas/politicas.component';
import { ContactoComponent } from './paginas/formalidades/contacto/contacto.component';
import { CrearperfiljComponent } from './paginas/crearperfilj/crearperfilj.component';
import { CrearperfilcComponent } from './paginas/crearperfilc/crearperfilc.component';
import { CequipojugadorComponent } from './paginas/cequipojugador/cequipojugador.component';
import { CjugadorequipoComponent } from './paginas/cjugadorequipo/cjugadorequipo.component';


const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'paginas/registro', component: RegistroComponent },
  { path: 'paginas/terminosycondiciones', component: TerminosycondicionesComponent },
  { path: 'paginas/politicas', component: PoliticasComponent  },
  { path: 'paginas/login', component: LoginComponent },
  { path: 'paginas/contacto', component: ContactoComponent  },
  { path: 'paginas/principal', component: PrincipalComponent, canActivate: [GuardAuthGuard], data: { roles: [1,2] } },
  { path: 'paginas/conectar', component: ConectarComponent, canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/perfil', component: PerfilComponent , canActivate: [GuardAuthGuard], data: { roles: [1,2] } },
  { path: 'paginas/perfilequipo/:id', component: PerfilequipoComponent  , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/perfiljugador/:id', component: PerfiljugadorComponent  , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/crearperfilJ', component: CrearperfiljComponent , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/crearperfilC', component: CrearperfilcComponent , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/cequipojugador', component: CequipojugadorComponent , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/cjugadorequipo', component: CjugadorequipoComponent , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/solicitud', component: SolicitudComponent , canActivate: [GuardAuthGuard], data: { roles: [2] } },
  { path: 'paginas/reporte', component: ReportesComponent, canActivate: [GuardAuthGuard], data: { roles: [1] } },
  { path: '**', component: MenuComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
