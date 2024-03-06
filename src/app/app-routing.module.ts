import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { DetalleComponent } from './detalle/detalle.component';
import { HomeComponent } from './home/home.component';

//rutas para el app.component.html
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'detalle', component: DetalleComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'users', component: ListUsersComponent},
  { path: '', redirectTo:'home', pathMatch:'full' },        // Ruta vacía: redirige a la pantalla de Home
  { path: '**', redirectTo:'home', pathMatch:'full'}     
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
