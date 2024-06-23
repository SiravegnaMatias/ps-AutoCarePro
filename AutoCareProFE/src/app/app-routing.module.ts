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
import { EcommerceComponent } from './components/ecommerceComponents/ecommerce/ecommerce.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { authGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { ProductDetailComponent } from './components/ecommerceComponents/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/ecommerceComponents/shopping-cart/shopping-cart.component';
import { AdminProductsComponent } from './components/ecommerceComponents/admin-products/admin-products.component';
import { AdminSalesComponent } from './components/ecommerceComponents/admin-sales/admin-sales.component';
import { EditProductComponent } from './components/ecommerceComponents/edit-product/edit-product.component';
import { AdminEcommerceComponent } from './components/ecommerceComponents/admin-ecommerce/admin-ecommerce.component';
import { SuppliersComponent } from './components/ecommerceComponents/suppliers/suppliers.component';
import { AddProductComponent } from './components/ecommerceComponents/add-product/add-product.component';
import { AddSupplierComponent } from './components/ecommerceComponents/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/ecommerceComponents/edit-supplier/edit-supplier.component';
import { ProductsComponent } from './components/ecommerceComponents/products/products.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { AdminSalesDetailComponent } from './components/ecommerceComponents/admin-sales-detail/admin-sales-detail.component';

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
        component: ServicesComponent,
        data: { allowedRoles: ['ADMIN', 'CLIENT', 'DETAILER'] }

      }, {
        path: 'services/edit/:name',
        component: EditServiceComponent,
        data: { allowedRoles: ['ADMIN'] }
      },
      {
        path: 'users/register-detailer',
        component: RegisterComponent,
        data: { role: 'detailer', allowedRoles: ['ADMIN'] }
      },
      {
        path: 'my-cars',
        component: CarsComponent,
        data: { allowedRoles: ['CLIENT', 'ADMIN'] }
      },
      {
        path: 'my-cars/edit/:id',
        component: EditCarComponent,
        data: {
          allowedRoles: ['CLIENT', 'ADMIN']
        },
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent,
        data: { allowedRoles: ['CLIENT', 'ADMIN'] }
      },
      {
        path: 'bookings',
        component: BookingsComponent,
        data: { allowedRoles: ['ADMIN', 'DETAILER'] }
      },
      {
        path: 'bookings/edit/:id',
        component: EditBookingComponent,
        data: { allowedRoles: ['ADMIN', 'DETAILER'] }

      },
      {
        path: 'users',
        component: UsersComponent,
        data: { allowedRoles: ['ADMIN'] },

      },
      {
        path: 'shop',
        component: EcommerceComponent,
        data: { allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] },
        children:
          [
            {
              path: '',
              redirectTo: 'products',
              pathMatch: 'full'
            },
            {
              path: 'product/:id',
              component: ProductDetailComponent,
              data: { allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] }

            },
            {
              path: 'cart',
              component: ShoppingCartComponent,
              data: { allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] }
            },
            {
              path: 'products',
              component: ProductsComponent,
              data: { allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] }
            }
          ]
      },

      {
        path: 'shop/admin',
        component: AdminEcommerceComponent,
        data: { allowedRoles: ['ADMIN'] },
        children:
          [
            {
              path: '',
              redirectTo: 'products',
              pathMatch: 'full'
            },
            {
              path: 'products',
              component: AdminProductsComponent,
              data: { allowedRoles: [, 'ADMIN', 'DETAILER'] }
            },
            {
              path: 'products/add',
              component: AddProductComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'products/edit/:id',
              component: EditProductComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'sales',
              component: AdminSalesComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'sales/detail/:id',
              component: AdminSalesDetailComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'suppliers',
              component: SuppliersComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'suppliers/edit/:id',
              component: EditSupplierComponent,
              data: { allowedRoles: ['ADMIN'] }
            },
            {
              path: 'suppliers/add',
              component: AddSupplierComponent,
              data: { allowedRoles: ['ADMIN'] }
            }
          ]
      },
      {
        path: 'frequent-questions',
        component: FrequentQuestionsComponent,
        data: { allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] }

      },
      {
        path: 'admin',
        component: AdminComponent,
        data: { allowedRoles: ['ADMIN'] }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { role: 'client', allowedRoles: ['CLIENT', 'ADMIN', 'DETAILER'] }
      }
      // Agrega otras rutas para los diferentes componentes del contenido principal aquí
    ]
  },
  // Agrega rutas para el registro y el inicio de sesión si es necesario
  { path: 'register', component: RegisterComponent, data: { role: 'client' } },
  { path: 'login', component: LoginComponent },
  // Puedes tener rutas adicionales aquí si es necesario
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
