import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  isFilter:boolean = false;
  filterForm!: FormGroup;
  filteredOrders!: Order[];

  constructor(
          private orderService: OrderService,
          private router: Router,
          private alertService:AlertService,
          private fb:FormBuilder
  ) { }


  ngOnInit(): void {
    this.getOrders();
    this.initForm();
  }

  initForm(){
    this.filterForm = this.fb.group({
      orderId: [''],
      clientName: [''],
      date: [''],
 
      payment: [''],
      status: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }
  getOrders(){
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.filteredOrders = res;
      },
      error: (err) => {
        this.alertService.somethingWentWrong('Error','Error al obtener las ordenes de compra, por favor intente de nuevo.');
      }
    });
  }

  applyFilters() {
    const { orderId, clientName, date, total, payment, status } = this.filterForm.value;

    this.filteredOrders = this.orders.filter(order => {
      return (!orderId || order.orderId.toString().includes(orderId))
        && (!clientName || `${order.user.firstName} ${order.user.lastName}`.toLowerCase().includes(clientName.toLowerCase()))
        && (!date || order.date.toString().includes(date))
        && (!payment || order.payment.toLowerCase().includes(payment.toUpperCase()))
        && (!status || order.status.toLowerCase().includes(status.toUpperCasse()));
    });
  }

  toggleFilter(){
    this.isFilter = !this.isFilter;
  }

  seeDetail(id:number){
    this.router.navigate(['/home/shop/admin/sales/detail',id]);
  }

 cleanFilters(){
    this.filterForm.reset();
    this.filteredOrders = this.orders;
 }
}
