import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { CartItem } from 'src/app/models/Cart';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private mp: any;

  constructor(private http: HttpClient, private loginService: LoginService) {
    loadMercadoPago();
    this.mp = new (window as any).MercadoPago('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
      locale: 'es-AR'
    });
 
    
  }

   createPreference(items: CartItem[]): Observable<string> {
    return this.http.post<string>('http://localhost:8080/mp', items /*, { headers }*/)
    // .pipe(
    //   map(response => {
    //     // Si la respuesta es un objeto, intenta acceder a la propiedad que contiene el ID
    //     if (typeof response === 'object' && response !== null && 'id' in response) {
    //       return response['id'];
    //     }
    //     // Si la respuesta es una cadena simple, conviértela a string
    //     return response.toString();
    //   }),
    //   catchError(error => {
    //     console.error('Error creating preference mp service:', error);
    //     return throwError(error); // Re-throw the error for proper handling
    //   })
    // );

  }


  createCheckoutButton(preferenceId: string) {
    const bricksBuilder = this.mp.bricks();
    const generateButton = async () => {
        if ((window as any).checkoutButton) {
            (window as any).checkoutButton.unmount();
        }
        (window as any).checkoutButton = await bricksBuilder.create('wallet', 'wallet_container', {
            initialization: {
                preferenceId: preferenceId,
            },
        });
    };
    generateButton();
}
}
