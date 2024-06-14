import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products:Product[] = [];
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
              private router:Router
  ){}


  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        this.alertService.somethingWentWrong('Error al cargar los productos','Por favor intente mas tarde');
      }
    });

  }

  seeDetail(id:number){
    this.router.navigate([`home/shop/product/${id}`]);
  }

}
