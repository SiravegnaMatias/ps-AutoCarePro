import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css']
})
export class EcommerceComponent {
  constructor(private router:Router) { }

  goToShop(){
    this.router.navigate(['home/shop']);
  }
}
