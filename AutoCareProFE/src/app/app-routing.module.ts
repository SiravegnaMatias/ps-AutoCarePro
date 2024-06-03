import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { CarsComponent } from './components/cars/cars.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { UsersComponent } from './components/users/users.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isLoggedInGuard],
    children: [
      { 
        path: '', 
        redirectTo: 'services', 
        pathMatch: 'full' 
      }, // Redirige a servicios por defecto
      { 
        path: 'services', 
        component: ServicesComponent ,
        data: {allowedRoles: ['ADMIN', 'CLIENT', 'DETAILER']}

      },{
        path: 'services/edit/:name',
        component: EditServiceComponent,
        data: {allowedRoles: ['ADMIN']}
      },
      {
        path: 'users/register-detailer',
         component: RegisterComponent, 
         data: {role: 'detailer' ,allowedRoles: ['ADMIN']}
      },
      {
        path: 'my-cars', 
        component:CarsComponent,
        data: {allowedRoles: ['CLIENT','ADMIN']}
      },
      {
        path: 'my-bookings', 
        component:MyBookingsComponent,
        data: {allowedRoles: ['CLIENT','ADMIN']}
      },
      {
        path: 'bookings', 
        component:BookingsComponent,
        data: {allowedRoles: ['ADMIN','DETAILER']}
      },
      {
        path: 'bookings/edit/:id', 
        component:EditBookingComponent,
        data: {allowedRoles: ['ADMIN','DETAILER']}

      },
      {
        path: 'users', 
        component:UsersComponent,
        data: {allowedRoles: ['ADMIN']},
        
      },
      {
        path: 'shop', 
        component: EcommerceComponent,
        data: {allowedRoles: ['CLIENT','ADMIN','DETAILER']}
      },
      {
        path: 'frequent-questions', 
        component: FrequentQuestionsComponent,
        data: {allowedRoles: ['CLIENT','ADMIN','DETAILER']}

      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {allowedRoles: ['ADMIN']}
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: {role: 'client',allowedRoles: ['CLIENT','ADMIN','DETAILER']}
      }
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
