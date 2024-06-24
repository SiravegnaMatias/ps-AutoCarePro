import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from 'src/app/models/order/Order';
import { OrderRequestDTO } from 'src/app/models/order/OrderRequestDTO';
import { UpdateStatusOrder } from 'src/app/models/order/UpdateStatusOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  private url:string = "http://localhost:8080/orders";

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.url);
  }

  getOrderById(id:number):Observable<Order>{
    return this.http.get<Order>(this.url+"/"+id);
  }

  addOrder(order:OrderRequestDTO):Observable<Order>{
    return this.http.post<Order>(this.url + '/add',order);
  }

  getOrdersByUser(id:number): Observable<Order[]>{
    return this.http.get<Order[]>(this.url + '/user/' + id);
  }

  getStatus():Observable<OrderStatus[]>{
    return this.http.get<OrderStatus[]>(this.url + '/status');
  }

  updateOrder(update:UpdateStatusOrder):Observable<Order>{
    return this.http.put<Order>(`${this.url}/update-status`, update);
  }
}
