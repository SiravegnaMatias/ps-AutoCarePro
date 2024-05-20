import { Component, OnInit } from '@angular/core';
import { CarRequest } from 'src/app/models/CarRequest';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarRequest[] = [];
  
  constructor(private carService:CarService){}

  ngOnInit(): void {
    this.cars = this.carService.getCarsOff();
  }

}
