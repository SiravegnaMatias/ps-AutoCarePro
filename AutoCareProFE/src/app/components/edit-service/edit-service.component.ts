import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceUpdate } from 'src/app/models/Service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit{
  
  serviceName!:string;
constructor(private route:ActivatedRoute,
            private fb:FormBuilder,
            private serviceService:ServiceManagmentService
){}

isDisabled:boolean = true;
disabled:boolean = true;
  formService!:FormGroup;

ngOnInit(): void {
    this.serviceName = this.route.snapshot.paramMap.get('name') || '';
    
    this.formService = this.fb.group({
      name: [''],
      price: [''],
      description: ['']
    });

    this.refreshService();
    this.formService.disable();

  }

  refreshService(){
    this.serviceService.getServiceByName(this.serviceName).subscribe((data) => {
      this.formService.patchValue(data);
    });
  }

  toggleEdit(){
    this.isDisabled = !this.isDisabled;

    if(this.isDisabled){
      this.formService.disable();
    }else{
      this.formService.enable();
    }
  }
  confirmChanges(){
    const service:ServiceUpdate = this.formService.value;
    this.serviceService.updateService(service).subscribe({
      next: () => {
        alert('Service updated successfully');
        this.refreshService();
      }
    });
  }
}
