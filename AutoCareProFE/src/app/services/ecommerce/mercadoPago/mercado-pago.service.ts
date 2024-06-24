import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login.service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private mp: any;

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.mp = new (window as any).MercadoPago('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
      locale: 'es-AR'
    });
  }

   createPreference(item: any): Observable<string> {
    const token = this.loginService.getToken();
    // const headers = new HttpHeaders({
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${token}`
    // });
  
    return this.http.post<string>('http://localhost:8080/mp', item)
      // .pipe(
      //   // catchError(error => {
      //   //   console.error('Error creating preference:', error);
      //   //   return throwError(error); // Re-throw the error for proper handling
      //   // }),
      //   map(response => response) // Keep the response as string
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
