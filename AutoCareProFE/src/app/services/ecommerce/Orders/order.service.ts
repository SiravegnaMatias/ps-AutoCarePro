import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order/Order';
import { OrderRequestDTO } from 'src/app/models/order/OrderRequestDTO';

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
}
