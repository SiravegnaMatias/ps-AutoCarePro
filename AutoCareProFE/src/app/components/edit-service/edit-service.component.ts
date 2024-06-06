import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceUpdate } from 'src/app/models/Service';
import { AlertService } from 'src/app/services/alert.service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  serviceName!: string;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private serviceService: ServiceManagmentService,
    private alertService:AlertService
  ) { }

  isDisabled: boolean = true;
  disabled: boolean = true;
  formService!: FormGroup;

  ngOnInit(): void {
    this.serviceName = this.route.snapshot.paramMap.get('name') || '';

    this.formService = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(35), Validators.minLength(4)]],
      price: ['', [Validators.min(1), Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(5)]]
    });

    this.refreshService();
    this.formService.disable();

  }

  refreshService() {
    this.serviceService.getServiceByName(this.serviceName).subscribe((data) => {
      this.formService.patchValue(data);
    });
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled;

    if (this.isDisabled) {
      this.formService.disable();
    } else {
      this.formService.get('price')?.enable();
      this.formService.get('description')?.enable();
    }
  }
  confirmChanges() {
    const service: ServiceUpdate = this.formService.value;
    if (this.formService.valid) {
      this.serviceService.updateService(service).subscribe({
        next: () => {
         this.alertService.succesfullLogin('Servicio actualizado correctamente');
          this.refreshService();
        },
        error: (err) => {
          console.error('Error updating service:', err);
          this.alertService.somethingWentWrong('Error actualizando el servicio', 'No se ha podido actualizar el servicio, por favor intente de nuevo');
        }
      });

    } else {
      this.formService.markAllAsTouched();
    }

  }

  cancelChanges(){
    this.refreshService();
    this.isDisabled = true;  
  }

  get name() {
    return this.formService.get('name');
  }

  get price() {
    return this.formService.get('price');
  }

  get description() {
    return this.formService.get('description');
  }
}
