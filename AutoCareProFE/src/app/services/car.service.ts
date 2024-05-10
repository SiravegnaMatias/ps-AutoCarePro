import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarRequest } from '../models/CarRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  carTypes: String[] = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pick Up', 'Convertible', 'Van'];

  private url:string = 'http://localhost:8080/vehicles';


  getCarTypes(): String[] {
    return this.carTypes;
  }

  addCar(car:CarRequest):Observable<CarRequest>{
    return this.http.post<CarRequest>(this.url, car);
  }
}
