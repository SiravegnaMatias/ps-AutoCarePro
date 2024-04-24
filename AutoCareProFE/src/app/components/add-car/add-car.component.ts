import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
  
  constructor(private fb:FormBuilder){}

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

  onSumbit(){
    console.log(this.carForm.value);
  }
}
