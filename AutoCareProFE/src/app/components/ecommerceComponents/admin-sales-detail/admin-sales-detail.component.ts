import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrderStatus } from 'src/app/models/order/Order';
import { UpdateStatusOrder } from 'src/app/models/order/UpdateStatusOrder';
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
  statusList:String[] = ['Aprobada', 'Entregado', 'Cancelado'];
  orderStatus:OrderStatus[] = [];
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
        this.orderService.getStatus().subscribe({
          next: (res) => {
            this.orderStatus = res;
          },
          error: (err) => {
            this.alertService.somethingWentWrong('Error','Error al obtener los estados de la orden de compra, por favor intente de nuevo.');
          }
        });
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al obtener la orden de compra, por favor intente de nuevo.');
      }
    });
  }

  back(){
    this.router.navigate(['/home/shop/admin/sales']);
  }

  confirm(){
    const status:UpdateStatusOrder = {
      orderId: this.orderId,
      statusId: Number(this.getSelectedStatusId())
    }

    this.orderService.updateOrder(status).subscribe({
      next: (res) => {
        this.alertService.succesfullLogin('Orden actualizada correctamente');
        this.router.navigate(['/home/shop/admin/sales']);
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al actualizar la orden de compra, por favor intente de nuevo.');
      }
    });

  }

  getSelectedStatusId(): string {
    const selectElement = document.getElementById('status-select') as HTMLSelectElement;
    const selectedStatusId = selectElement.value; // This will hold the selected status ID
    return selectedStatusId;
  }
}
