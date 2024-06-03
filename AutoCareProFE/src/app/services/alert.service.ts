import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  confirm(title:string,message:string){
    alertify.confirm(title, message, function(){ alertify.success('Ok') }
                , function(){ alertify.error('Cancel')})
  }
  
  success(message :string){
    alertify.success(message);
  }
  
  error(message :string){
    alertify.error(message);
  }
  warning(message :string){
    alertify.warning(message);
  }


  message(message :string){
    alertify.message(message);
  }
  
}
