import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarRequest, CarResponse } from 'src/app/models/CarRequest';
import { AlertService } from 'src/app/services/alert.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit{
  carId!:number;
  car!:CarResponse;
  carForm!:FormGroup;  
  isDisabled:boolean = true;
  carTypes: String[] = [];
  
  constructor(
                private carService:CarService,
                private route:ActivatedRoute,
                private alertService:AlertService,
                private fb:FormBuilder
){}
  
  ngOnInit(): void {
    this.carId = this.route.snapshot.params['id'];
    this.getTypes();
    this.getCar();
    this.initForm();
    this.carForm.disable();
  }

  getTypes() {
   this.carTypes =this.carService.getCarTypes();
  }

  initForm() {
    this.carForm = this.fb.group({
      model: ['',[Validators.required, Validators.maxLength(35),Validators.minLength(2)]],
      brand:['',[Validators.required, Validators.maxLength(35),Validators.minLength(1)]],
      year: [null,[Validators.required, Validators.min(1900)]],
      plate: ['',[Validators.required, Validators.maxLength(7),Validators.minLength(6)]],
      carType: ['',Validators.required],
    });
  }


  getCar() {
      this.carService.getCarById(this.carId).subscribe({
        next: (car) => {
          this.car = car;
          this.carForm.patchValue(car);
        }
      });

    }

    cancelChanges(){
     this.getCar();
      this.isDisabled = true;  
    }

    confirmChanges(){
      const carRequest:CarRequest = this.carForm.value;
      if(this.carForm.valid){
        this.carService.updateCar(this.carId,carRequest).subscribe({
          next: (car) => {
            this.alertService.succesfullLogin('Cambios guardados');
            this.getCar();
            this.toggleEdit();
          },
          error: (error) => {
            this.alertService.somethingWentWrong('Error al guardar los cambios', 'Por favor intente mas tarde');
          }
        });
      }
      else{
        this.carForm.markAllAsTouched();
      }
    }

    toggleEdit(){
      this.isDisabled = !this.isDisabled;

      if (this.isDisabled) {
        this.carForm.disable();
      } else {
       this.carForm.enable();
      }
    }

    get model(){
      return this.carForm.get('model');
    }
    get brand(){
      return this.carForm.get('brand');
    }
    get year(){
      return this.carForm.get('year');
    }

    get plate(){
      return this.carForm.get('plate');
    }

    get carType(){
      return this.carForm.get('carType');
    }
  }



