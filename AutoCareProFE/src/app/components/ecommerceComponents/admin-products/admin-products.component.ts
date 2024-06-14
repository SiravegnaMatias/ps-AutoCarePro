import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  implements OnInit{

  products!:Product[];
  
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
              private router:Router
  ){}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error getting products:', err);
        this.alertService.somethingWentWrong('Error obteniendo productos', 'No se han podido obtener los productos, por favor intente de nuevo');
      }
    });
  }

  editProduct(id:number){
    this.router.navigate(['home/shop/admin/products/edit',id]);
  }
}
