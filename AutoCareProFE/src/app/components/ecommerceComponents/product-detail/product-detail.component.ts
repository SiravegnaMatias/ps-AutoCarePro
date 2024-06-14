import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
 
  idProduct!:number;
  product!:Product;
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
             private route:ActivatedRoute

  ){}

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params['id'];
    this.refreshProduct();
  }

  refreshProduct(){
    this.productService.getProduct(this.idProduct).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.log(error);
        this.alertService.somethingWentWrong('Error al cargar el producto','Por favor intente mas tarde');
      }
    });
  }
}
