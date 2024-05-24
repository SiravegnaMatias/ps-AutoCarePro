import { Component, OnInit } from '@angular/core';
import { CarRequest } from 'src/app/models/CarRequest';
import { CarService } from 'src/app/services/car.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarRequest[] = [];
userId!:number;
  constructor(private carService:CarService, private loginService:LoginService){
    carService.carAdded$.subscribe({
      next: () => {
        this.refreshCars();
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    // this.carService.getCarsById(this.userId).subscribe({
    //   next: (res) => {
    //     this.cars = res;
    //   },
    //   error: (err) => {
    //     console.error('Error refreshing cars:', err);
    //     alert('Failed to refresh cars');
    //   }
    // }); 
    this.refreshCars();
  }

  refreshCars(){
    this.carService.getCarsById(this.userId).subscribe({
      next: (res) => {
        this.cars = res;
      },
      error: (err) => {
        console.error('Error refreshing cars:', err);
        alert('Failed to refresh cars');
      }
    });
  }

}
