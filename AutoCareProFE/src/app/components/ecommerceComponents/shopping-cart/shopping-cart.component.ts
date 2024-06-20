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

  getTotalCart(cart: Cart): number {
    let total: number = 0;

    for (let item of cart.items) {
      total += this.getTotalProduct(item);
    }

    return total
  }

  onQuantityChange(item: CartItem): void {
    const cartRequest = { userId: this.cart.userId, productId: item.product.id };
    this.cartService.updateProductQuantity(cartRequest, item.quantity).subscribe({
      next: (cart) => {

      },
      error: (err) => {
        this.alertService.somethingWentWrong('ERROR', 'Error al actualizar la cantidad');
      }
    });
  }

  deleteProduct(item: CartItem): void {
    const cartRequest = { userId: this.cart.userId, productId: item.product.id };
    this.cartService.deleteProduct(cartRequest).subscribe({
      next: (cart) => {
        this.alertService.succesfullLogin('Producto eliminado del carrito');
      },
      error: (err) => {
        console.error(err);
        this.alertService.somethingWentWrong('ERROR', 'Error al eliminar el producto');
      }
    });
  }
}