import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  succesfullLogin(message:String){

    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
  }

  somethingWentWrong(title: string, text: string){
    Swal.fire({
      icon: "error",
      title: title,
      text: text,

    });
  }
  

  warning(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: "warning"
    });
  }
}
