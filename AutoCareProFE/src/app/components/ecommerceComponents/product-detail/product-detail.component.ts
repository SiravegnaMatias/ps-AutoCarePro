import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';
import { LoginService } from 'src/app/services/login.service';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
 
  idProduct!:number;
  product!:Product;
  userId!:number;
  productForm!:FormGroup;
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
             private route:ActivatedRoute,
             private loginService:LoginService,
             private cartService:CartService,
             private fb:FormBuilder

  ){}

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.params['id'];
    this.userId = this.loginService.currentUserData.value.id;
    this.refreshProduct();

    this.productForm = this.fb.group({
      quantity:[1,[Validators.required, Validators.min(1)]]
    });
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

  addToCart(){
    const quantity =Number( this.productForm.get('quantity')?.value);
    if(this.productForm.valid){
      this.cartService.addProductToCart({userId:this.userId,productId:this.idProduct},quantity).subscribe({
        next: (cart) => {
          this.alertService.succesfullLogin('Producto agregado al carrito');
        }
      });
    }else {
      this.productForm.markAllAsTouched();
    }
  }

  get quantity(){
    return this.productForm.get('quantity');
  }
}
