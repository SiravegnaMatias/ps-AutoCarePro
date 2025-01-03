import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../../login.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { CartItem } from 'src/app/models/Cart';
import { AlertService } from '../../alert.service';
import { MpResponse } from 'src/app/models/mpResponse';
@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService {

  private mp: any;
  private ventana: any;

  constructor(private http: HttpClient, private loginService: LoginService, private window: Window, private sAlert:AlertService) {
    this.ventana = this.window;

    this.loadMp();

  }

  public async loadMp() {

    try {
      // await loadMercadoPago();
      // this.mp = new this.ventana['MecadoPago']('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
      //   locale: 'es-AR'
      // });
      await loadMercadoPago();
      this.mp = new (window as any).MercadoPago('APP_USR-2e0d0f93-83b0-42df-bace-f6be084fb036', {
        locale: 'es-AR'
      });
    } catch (error){
      console.log(error);
      this.sAlert.somethingWentWrong('error','El servicio de Mercado Pago esta temporalmente innaccesible por favor intente mas tarde')
    }
    
  }
  createPreference(items: CartItem[]): void {
     this.http.post<string>('http://localhost:8080/mp', items /*, { headers }*/)
        .subscribe({
          next: (resp:any) => {
            this.createButtonMp(resp.id)
          },
          error:(error) => {
            console.log(error);
            this.sAlert.somethingWentWrong('ERROR', 'Ha ocurrido un error al crear la preferencia')
          } 
        })
  
  }

  private createButtonMp(preferenceId:string){
    const bricksBuilder = this.mp.bricks();
    this.renderizeButton(bricksBuilder, preferenceId);
    
  }


  private async renderizeButton(bricksBuilder: any, preferenceId: string) {
    this.ventana.checkoutButton?.unmount();
    try{
      await bricksBuilder.create('wallet', 'wallet_container',{
        initialization: {
          preferenceId: preferenceId,
          redirectMode: 'blank'
        },
        customization: {
          texts: {
           valueProp: 'smart_option',
          },
        },
      });
    }catch(error) {
      console.error(error);
    }
  }



  // createCheckoutButton(preferenceId: string) {
  //   const bricksBuilder = this.mp.bricks();
  //   const generateButton = async () => {
  //     if ((window as any).checkoutButton) {
  //       (window as any).checkoutButton.unmount();
  //     }
  //     (window as any).checkoutButton = await bricksBuilder.create('wallet', 'wallet_container', {
  //       initialization: {
  //         preferenceId: preferenceId,
  //       },
  //     });
  //   };
  //   generateButton();
  // }
}
