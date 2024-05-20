import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarRequest, CarResponse } from '../models/CarRequest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  carTypes: String[] = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Pick Up', 'Convertible', 'Van'];

  cars:CarRequest[] = [
    {
      brand: 'BMW',
      model: 'M4',
      year: 2027,
      carType: 'Coupe',
      plate: 'ABC123',
      userId: 1
    },
    {
      brand: 'Honda',
      model: 'Civic',
      year: 2017,
      carType: 'Sedan',
      plate: 'DEF456',
      userId: 1
    }
  ];

  private url:string = 'http://localhost:8080/vehicles/';


  getCarTypes(): String[] {
    return this.carTypes;
  }

  getCarsOff():CarRequest[]{
    return this.cars;
  }
  addCar(car:CarRequest):Observable<CarRequest>{
    return this.http.post<CarRequest>(this.url, car);
  }

  getCarsById(userId:number):Observable<CarResponse[]>{
    return this.http.get<CarResponse[]>(this.url+ userId);
  }
}
