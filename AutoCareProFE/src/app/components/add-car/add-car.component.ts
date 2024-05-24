import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarRequest } from 'src/app/models/CarRequest';
import { CarService } from 'src/app/services/car.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  userId!: number ;
  car!:CarRequest;
  constructor(private fb:FormBuilder,
    private carService: CarService,
    private loginService:LoginService
  ){}

  carTypes: String[] = [];
  ngOnInit(): void {
    this.carTypes = this.carService.getCarTypes();
    this.userId = this.loginService.currentUserData.value.id;
  }

  carForm = this.fb.group({
    model: [''],
    brand:[''],
    year: [null],
    plate: [''],
    carType: [''],
  });
 

  sumbit(){
    this.car = {
      model: this.carForm.value.model || '',
      brand: this.carForm.value.brand || '',
      year: this.carForm.value.year || 1,
      plate: this.carForm.value.plate || '',
      carType: this.carForm.value.carType || '',
      userId: this.userId || 0
    }
    console.log(this.car);
    this.carService.addCar(this.car).subscribe({
      next: (response) => {
        console.log(response);
        alert('Car added successfully');
      this.carService.carAdded(); 

      },
      error: (err) => {
        console.error('Error adding car:', err);
        alert('Failed to add car');
      }
    });
  }

 
}
