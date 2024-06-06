import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CarRequest } from 'src/app/models/CarRequest';
import { AlertService } from 'src/app/services/alert.service';
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
    private loginService:LoginService,
    private alertService:AlertService
  ){}

  carTypes: String[] = [];
  ngOnInit(): void {
    this.carTypes = this.carService.getCarTypes();
    this.userId = this.loginService.currentUserData.value.id;
  }

  carForm = this.fb.group({
    model: ['',[Validators.required, Validators.maxLength(35),Validators.minLength(4)]],
    brand:['',[Validators.required, Validators.maxLength(35),Validators.minLength(1)]],
    year: [null,[Validators.required, Validators.min(1900)]],
    plate: ['',[Validators.required, Validators.maxLength(7),Validators.minLength(6)]],
    carType: ['',Validators.required],
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
        this.alertService.succesfullLogin('Vehiculo añadido correctamente');
      this.carService.carAdded(); 

      },
      error: (err) => {
        console.error('Error adding car:', err);
        this.alertService.somethingWentWrong('Error añadiendo el vehiculo', 'No se ha podido agregar el vehiculo, por favor intente de nuevo');
      }
    });
  }

  get brand() { return this.carForm.get('brand'); }
  get model() { return this.carForm.get('model'); }
  get year() { return this.carForm.get('year'); }
  get plate() { return this.carForm.get('plate'); }
  get carType() { return this.carForm.get('carType'); }
 
}
