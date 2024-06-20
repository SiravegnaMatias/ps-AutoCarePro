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
import { EcommerceComponent } from './components/ecommerceComponents/ecommerce/ecommerce.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { ProductDetailComponent } from './components/ecommerceComponents/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/ecommerceComponents/shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './components/ecommerceComponents/admin-products/admin-products.component';
import { AdminSalesComponent } from './components/ecommerceComponents/admin-sales/admin-sales.component';
import { EditProductComponent } from './components/ecommerceComponents/edit-product/edit-product.component';
import { AdminEcommerceComponent } from './components/ecommerceComponents/admin-ecommerce/admin-ecommerce.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SuppliersComponent } from './components/ecommerceComponents/suppliers/suppliers.component';
import { AddProductComponent } from './components/ecommerceComponents/add-product/add-product.component';
import { AddSupplierComponent } from './components/ecommerceComponents/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/ecommerceComponents/edit-supplier/edit-supplier.component';
import { ProductsComponent } from './components/ecommerceComponents/products/products.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';

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
    ProfileComponent,
    EditServiceComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    AdminSalesComponent,
    EditProductComponent,
    AdminEcommerceComponent,
    SuppliersComponent,
    AddProductComponent,
    AddSupplierComponent,
    EditSupplierComponent,
    ProductsComponent,
    EditCarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    FormsModule,
    SweetAlert2Module.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true
  },
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
