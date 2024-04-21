import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { CarsComponent } from './components/cars/cars.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'services', pathMatch: 'full' }, // Redirige a servicios por defecto
      { path: 'services', component: ServicesComponent },
      {path: 'register-detailer', component: RegisterComponent, data: {role: 'detailer'}},
      {path: 'my-cars', component:CarsComponent}
      // Agrega otras rutas para los diferentes componentes del contenido principal aquí
    ]
  },
  // Agrega rutas para el registro y el inicio de sesión si es necesario
  { path: 'register', component: RegisterComponent, data: {role: 'client'}},
  { path: 'login', component: LoginComponent },
  // Puedes tener rutas adicionales aquí si es necesario
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
