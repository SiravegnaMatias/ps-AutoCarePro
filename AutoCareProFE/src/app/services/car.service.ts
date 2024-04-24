import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }
  carTypes: String[] = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Wagon', 'Sports Car', 'Luxury Car', 'Hybrid Car', 'Electric Car']
  getCarTypes(): String[] {
    return this.carTypes;
  }
}
