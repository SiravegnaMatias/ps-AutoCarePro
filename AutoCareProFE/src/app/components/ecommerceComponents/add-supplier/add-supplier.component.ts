import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {

  constructor(private router:Router) { }

  backToProviders(){
    this.router.navigate(['home/shop/admin/suppliers']);
  }

  sumbit(){

  }
}
