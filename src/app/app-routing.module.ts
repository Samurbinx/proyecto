import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { DetalleComponent } from './detalle/detalle.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

//rutas para el app.component.html
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'admin', component: AdminComponent},
  { path: '', redirectTo:'home', pathMatch:'full' },        // Ruta vacía: redirige a la pantalla de Home
  { path: '**', redirectTo:'home', pathMatch:'full'}     
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
