import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { AddServicesComponent } from './components/add-services/add-services.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CarsComponent } from './components/cars/cars.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { JwtInterceptorService } from './services/interceptor/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/interceptor/error-interceptor.service';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EditBookingComponent } from './components/edit-booking/edit-booking.component';
import { UsersComponent } from './components/users/users.component';
import { EcommerceComponent } from './components/ecommerce/ecommerce.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ServicesComponent,
    AddServicesComponent,
    CarsComponent,
    AddCarComponent,
    MyBookingsComponent,
    BookingsComponent,
    EditBookingComponent,
    UsersComponent,
    EcommerceComponent,
    FrequentQuestionsComponent,
    AdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true
  },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
