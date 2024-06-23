import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/Cart';
import { OrderRequestDTO } from 'src/app/models/order/OrderRequestDTO';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/ecommerce/Orders/order.service';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isChecked: boolean = false;

  cart!: Cart;
  constructor(
    private alertService: AlertService,
    private cartService: CartService,
    private orderService: OrderService,
    private router:Router


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

  toggleCheckboc(){
    console.log(this.isChecked);
  }

  buy() {
    let order: OrderRequestDTO = this.getOrder();

    console.log(order);
    this.orderService.addOrder(order).subscribe({
      next: (res) => {
        this.alertService.succesfullLogin('Compra realizada con éxito');
         this.cartService.clearCart(this.cart.userId).subscribe({
            next:(res) =>{
              this.router.navigate(['/home/shop'])
            } 
            });
          },
      error: (err) => {
        console.error(err);
        this.alertService.somethingWentWrong('ERROR', 'Error al realizar la compra');
      }
    });
  }


  getOrder(): OrderRequestDTO {
    let order: OrderRequestDTO = {
      userId: this.cart.userId,
      orderDetails: this.cart.items.map(item => {
        return { productId: item.product.id, quantity: item.quantity }
      }),
      paymentMethod: this.isChecked ? 'PRESENCIAL' : 'MP'
    }
    return order;
  }

  seeProducts(){
    this.router.navigate(['/home/shop/products']);
  }
}