import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit{

  
  cartItemCount: number = 0;
  userId!:number ;
  constructor(private router:Router, private cartService:CartService,private loginService:LoginService) { }


  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    this.cartService.getCartByUserId(this.userId).subscribe();
    this.cartService.cartItemCount$.subscribe(count => this.cartItemCount = count);
    
  }

  goToShop(){
    this.router.navigate(['home/shop']);
  }

  goToShoppings(){
    this.router.navigate(['home/shop/my-shopping']);
  }
}
