import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-ecommerce',
  templateUrl: './admin-ecommerce.component.html',
  styleUrls: ['./admin-ecommerce.component.css']
})
export class AdminEcommerceComponent {

  constructor(private router:Router) { }

  goToShop(){
    this.router.navigate(['/home/shop']);
  }
}
