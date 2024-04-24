import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {


  constructor(private fb:FormBuilder,
    private carService: CarService
  ){}
  carTypes: String[] = [];
  ngOnInit(): void {
    this.carTypes = this.carService.getCarTypes();
  }

  files: File[] = [];
  carForm = this.fb.group({
    model: [''],
    brand:[''],
    year: [null],
    plate: [''],
    carType: [''],
  });
  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sumbit(){
    console.log(this.carForm.value);
  }
}
