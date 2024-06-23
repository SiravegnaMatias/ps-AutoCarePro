import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order/Order';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/ecommerce/Orders/order.service';

@Component({
  selector: 'app-admin-sales-detail',
  templateUrl: './admin-sales-detail.component.html',
  styleUrls: ['./admin-sales-detail.component.css']
})
export class AdminSalesDetailComponent implements OnInit {

  orderId!:number;
  order!:Order;
  constructor(
            private route:ActivatedRoute,
            private router:Router,
            private orderService:OrderService,
            private alertService:AlertService

  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];

    this.getOrder(this.orderId);
    console.log(this.order);

  }

  getOrder(id:number){
    this.orderService.getOrderById(id).subscribe({
      next: (res) => {
        this.order = res;
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al obtener la orden de compra, por favor intente de nuevo.');
      }
    });
  }

  back(){
    this.router.navigate(['/home/shop/admin/sales']);
  }
}
