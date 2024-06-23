import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductXSale } from 'src/app/models/chartDtos/ProductXsale';
import { ServiceRequested } from 'src/app/models/chartDtos/ServiceRequested';
import { UserXVehicle } from 'src/app/models/chartDtos/UserXVehicle';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http:HttpClient) { }

  private serviceMostRequested:string = "http://localhost:8080/bookings/most-requested-service";
  private userVehicles:string = "http://localhost:8080/users/vehicle-counts";
  private productsSales:string = "http://localhost:8080/orders/products-sales-count";


  getMostRequestedService():Observable<ServiceRequested[]>{
    return this.http.get<ServiceRequested[]>(this.serviceMostRequested);
  }

  getUserVehicles():Observable<UserXVehicle[]>{
    return this.http.get<UserXVehicle[]>(this.userVehicles);
  }

  getproductsSalesCount():Observable<ProductXSale[]>{
    return this.http.get<ProductXSale[]>(this.productsSales);
  }

  getMostSoldProdcutsBySales(from:string, to:string):Observable<ProductXSale[]>{
    return this.http.get<ProductXSale[]>(`http://localhost:8080/orders/most-sold-product?startDate=${from}&endDate=${to}`);
  }
}
