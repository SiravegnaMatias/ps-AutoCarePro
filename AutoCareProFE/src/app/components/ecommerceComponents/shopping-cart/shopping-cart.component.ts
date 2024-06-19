import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/Cart';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {



  cart!: Cart;
  constructor(
    private alertService: AlertService,
    private cartService: CartService

  ) { }
  ngOnInit(): void {
    this.cartService.currentCartData.subscribe(cart => this.cart = cart);
  }


  getTotalProduct(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  getTotalCart(cart: Cart):number {
    let total:number = 0;

    for (let item of cart.items) {
      total += this.getTotalProduct(item);
    }

    return total
  }
}
