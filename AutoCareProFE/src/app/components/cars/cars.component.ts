import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarRequest, CarResponse } from 'src/app/models/CarRequest';
import { CarService } from 'src/app/services/car.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarResponse[] = [];
userId!:number;
  constructor(private carService:CarService, private loginService:LoginService,private router:Router){
    carService.carAdded$.subscribe({
      next: () => {
        this.refreshCars();
      }
    });
  }

  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    
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
  editCar(id:number){
    this.router.navigate([`home/my-cars/edit`,id]);
  }
}
