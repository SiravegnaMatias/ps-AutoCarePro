import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { switchMap } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/Cart';
import { OrderRequestDTO } from 'src/app/models/order/OrderRequestDTO';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/ecommerce/Orders/order.service';
import { CartService } from 'src/app/services/ecommerce/cartServices/cart.service';
import { MercadoPagoService } from 'src/app/services/ecommerce/mercadoPago/mercado-pago.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  isChecked: boolean = false;
  cart!: Cart;
  userId!: number;
  cartPreferences: string = ''; // Preferencia de MercadoPago

  preference: string = "257122215-d885efae-d580-4274-b74e-f4e46e301d41"
  constructor(
    private alertService: AlertService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private mercadoPagoService: MercadoPagoService,
    private loginService: LoginService


  ) { }
  ngOnInit(): void {

    // this.cartService.currentCartData.subscribe({
    //   next: (cart) => {
    //     this.cart = cart;
    //     console.log('carrito: ' +this.cart);
    //     this.getPreference()
    //   },
    //   error: (err) => {

    //     this.alertService.somethingWentWrong('ERROR', 'Error al cargar el carrito');
    //   }
    // })

    this.userId = this.loginService.currentUserData.value.id;
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (cart) => {
        this.cart = cart;
     this.preference = this.cartService.cartPreferences.value;
     this.cartService.cartPreferences.subscribe({
        next: (preference) => {
          this.cartPreferences = preference
          this.initMP(this.cartPreferences);    
        }
          ,
          error: (err) => {   
            this.alertService.somethingWentWrong('ERROR', 'Error al obtener la preference');
          }
     });
        // console.log('preferencia: ', this.cartService.cartPreferences.value);
        // console.log('carrito: ', JSON.stringify(this.cart.items, null, 2));
       //  this.getPreference()
       // this.initMP(this.preference);
        //el problema esta en el flujo porque si lo inici desde aca anda pero si lo hago desde el metodo get prefence no, 
        // la preferencia que trae desde el backen tambien esta bien asi que tengo que revisar lo otro
      },
      error: (err) => {

        this.alertService.somethingWentWrong('ERROR', 'Error al cargar el carrito');
      }
    });

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

  toggleCheckboc() {
    console.log(this.isChecked);
  }

  buy() {
    let order: OrderRequestDTO = this.getOrder();

    console.log(order);
    this.orderService.addOrder(order).subscribe({
      next: (res) => {
        this.alertService.succesfullLogin('Compra realizada con éxito');
        this.cartService.clearCart(this.cart.userId).subscribe({
          next: (res) => {
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

  seeProducts() {
    this.router.navigate(['/home/shop/products']);
  }

  getPreference() {
    const cartItems: CartItem[] = this.getItems(this.cart);


    // Verificar que el carrito no esté vacío
    if (cartItems.length === 0) {
      console.error('El carrito está vacío. No se pueden crear preferencias sin items.');
      this.alertService.somethingWentWrong('ERROR', 'El carrito está vacío. Añade items antes de proceder.');
      return;
    }

    console.log('items del carrito: ' + JSON.stringify(cartItems));
    this.mercadoPagoService.createPreference(cartItems).subscribe({
      next: (preferenceId) => {

        this.initMP("257122215-d885efae-d580-4274-b74e-f4e46e301d41");
      },
      error: (err) => {
        console.error('Error processing purchase a:', err);
      }
    });
  }


  initMP(preferenceId: string) {
    console.log('Inicializando MercadoPago con preferenceId:', preferenceId);
    let container = document.getElementById('wallet_container');
    if (!container) {
      console.error('El contenedor wallet_container no existe en el DOM.');
      return;
    }

    let node = document.createElement('script');
    node.src = 'https://sdk.mercadopago.com/js/v2';
    node.onload = () => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = `
        const mp = new MercadoPago('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
          locale: "es-AR"
        });
        const bricksBuilder = mp.bricks();

        bricksBuilder.create("wallet", "wallet_container", {
          initialization: {
            preferenceId: "${this.preference}",
            redirectMode: "blank"
          },
          customization: {
            texts: {
              valueProp: 'smart_option',
            },
          },
        });
      `;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
    node.onerror = (err) => {
      console.error('Error loading MercadoPago SDK', err);
    }
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  getItems(cart: Cart): CartItem[] {
    return cart.items.map(item => {
      return { id: item.id, product: item.product, quantity: item.quantity }
    });

  }

  createPreference() {
    return '257122215-d4b4cac6-4f2c-4063-a2a7-757115c86502';
  }





}



// async buyMp() {
//   try {
//     const item = this.createItemFromCart();
//     console.log(item);
//     this.mercadoPagoService.createPreference(item).subscribe({
//       next: (preferenceId) => {
//         console.log(preferenceId);
//         this.mercadoPagoService.createCheckoutButton(preferenceId);
//       },
//       error: (err) => {
//         console.error('Error processing purchase a:', err);
//       }
//     });
//   } catch (e) {
//     console.error('Error processing purchase b:', e);
//   }
// }

// createItemFromCart() {
//   // lógica para crear el objeto del artículo basado en los ítems del carrito
//   return {
//     title: 'Articulo de ejemplo',
//     quantity: 1,
//     unit_price: 100,
//   };
// }

// createPaymentButton() {
//   loadMercadoPago();
//   const mp = new MercadoPago('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
//     locale: "es-AR" as any
//   })
//   const preferenceId = this.createPreference();
//   const bricksBuilder = mp.bricks();


//   bricksBuilder.create("wallet", "wallet_container", {
//     callbacks: {
//       onSubmit: async (f) => {
//         // Aquí puedes manejar la información del pago
//         console.log(f);

//         // Debes devolver una promesa que resuelve a un string
//         return 'payment_id'; // Reemplaza con el ID de pago real
//       }
//     },
//     initialization: {
//       preferenceId,
//     },

//   });
// }
