import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  userId!:number;
  products:Product[] = [];
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
              private router:Router,
              private cartService:CartService,
              private loginService:LoginService
  ){}


  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        this.alertService.somethingWentWrong('Error al cargar los productos','Por favor intente mas tarde');
      }
    });
    console.log('USER ID:'+this.userId);
  }

  seeDetail(id:number){
    this.router.navigate([`home/shop/product/${id}`]);
  }

  addProductToCart(event:Event,id:number){
    event.stopPropagation();
    this.cartService.addProductToCart({userId:this.userId,productId:id},1).subscribe({
      next: (cart) => {
        this.alertService.succesfullLogin('Producto agregado al carrito');
      }
    });
  }
}

