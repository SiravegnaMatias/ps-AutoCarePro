import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order/Order';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/ecommerce/Orders/order.service';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.css']
})
export class AdminSalesComponent implements OnInit {

  orders: Order[] = [];

  constructor(
          private orderService: OrderService,
          private router: Router,
          private alertService:AlertService
  ) { }


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al obtener las ordenes de compra, por favor intente de nuevo.');
      }
    });
  }


  seeDetail(id:number){
    this.router.navigate(['/home/shop/admin/sales/detail',id]);
  }
}
