import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/models/order/Order';
import { AlertService } from 'src/app/services/alert.service';
import { OrderService } from 'src/app/services/ecommerce/Orders/order.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit{
 

  userId!:number;
  filteredOrders!:Order[];
  orders:Order[]=[];
  isFilter:boolean = false;
  filterForm!: FormGroup;
  statusList:String[] =[ 'Aprobada', 'Entregado', 'Cancelado']

  constructor(
        private orderService:OrderService,
        private alertService:AlertService,
        private loginService:LoginService,
        private fb:FormBuilder
  ){}

  ngOnInit(): void {
  this.userId = this.loginService.currentUserData.value.id;
  this.getOrders();
    this.initForm()
  }

  initForm(){
    this.filterForm = this.fb.group({
      orderId: [''],
      date: [''],
      payment: [''],
      status: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }
  getOrders(){
    this.orderService.getOrdersByUser(this.userId).subscribe({
      next: (res) => {
        this.orders = res;
        this.filteredOrders = res;
        console.log(this.filteredOrders)
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al obtener las ordenes de compra, por favor intente de nuevo.');
      }
    }
    )
  }

  toggleFilter(){
    this.isFilter = !this.isFilter;

  }

  cleanFilters(){
    this.filterForm.reset();
    this.filteredOrders = this.orders;
  }

  applyFilters() {
    const { orderId, clientName, date, total, payment, status } = this.filterForm.value;

    this.filteredOrders = this.orders.filter(order => {
      return (!orderId || order.orderId.toString().includes(orderId))
        && (!date || order.date.toString().includes(date))
        && (!payment || order.payment.toUpperCase().includes(payment.toUpperCase()))
        && (!status || order.status.toLowerCase().includes(status.toLowerCase()));
    });
  }

}
