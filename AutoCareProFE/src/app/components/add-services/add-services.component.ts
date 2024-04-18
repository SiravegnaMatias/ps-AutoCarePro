import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Service } from 'src/app/models/Service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit{
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  serviceForm = this.fb.group({
    name: [''],
    description: [''],
    price: [null],
    image: ['']
  });

  sumbit(){
    const service:Service = this.createService(this.serviceForm.value);
    console.log(service);
  }

  createService(value: Partial<{ name: string | null; description: string | null; price: null; image: string | null; }>): Service {
    return {
      name: value.name || '',
      description: value.description || '',
      price: value.price || 0,
      image: value.image || ''
    }
  }
  
}
