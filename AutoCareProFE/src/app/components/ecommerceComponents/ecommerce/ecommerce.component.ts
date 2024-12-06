import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent implements OnInit{

  
  cartItemCount: number = 0;
  userId!:number ;
  userLogged: User = {  firstName: '', email: '',lastName:'', address: '', role: {id:0, name:''}};
  constructor(private router:Router,
     private cartService:CartService,private loginService:LoginService
    ,private userService: UserService
    ) { }


  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    this.cartService.getCartByUserId(this.userId).subscribe();
    this.cartService.cartItemCount$.subscribe(count => this.cartItemCount = count);
    this.userService.getUserById(this.userId).subscribe((user: User) => {
      this.userLogged = user;
    });
    
  }

  goToShop(){
    this.router.navigate(['home/shop']);
  }

  goToShoppings(){
    this.router.navigate(['home/shop/my-shopping']);
  }

  isAuthorized(roles: string[]): boolean {
    return roles.includes(this.userLogged.role.name);
  }
}
