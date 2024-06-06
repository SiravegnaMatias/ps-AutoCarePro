import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Service } from 'src/app/models/Service';
import { AlertService } from 'src/app/services/alert.service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';
import { ServiceUpdateService } from 'src/app/services/service-update.service';
import { UploadImgService } from 'src/app/services/upload-img.service';
@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  constructor(
                private fb: FormBuilder, 
                private uploadService: UploadImgService, 
                private srv:ServiceManagmentService,
                private srvUpd:ServiceUpdateService,
                private alertService:AlertService

  ) { }
  files: File[] = [];

  ngOnInit(): void {
  }

  serviceForm = this.fb.group({
    name: ['',[Validators.required, Validators.maxLength(35),Validators.minLength(4)]],
    description: ['', [Validators.required, Validators.maxLength(250),Validators.minLength(5)]],
    price: [null, [Validators.required, Validators.min(1)]],
    image: ['']
  });

   sumbit() {
    const service: Service = this.createService(this.serviceForm.value);
    
    if(this.serviceForm.valid) {

      if(this.files.length === 0){
        this.alertService.warning('Imagen no seleccionada', 'Por favor seleccione una imagen para el servicio');
        return;
      }

      this.uploadAndGetUrl().subscribe({
        next: (url) => {
          service.image = url;
          this.srv.addService(service).subscribe({
            next: (res) => {
              this.alertService.succesfullLogin('Servicio añadido correctamente');
              this.serviceForm.reset();
              this.srvUpd.serviceAdded();
            },
            error: (err) => {
              console.error('Error adding service:', err);
              this.alertService.somethingWentWrong('Error añadiendo el servicio', 'No se ha podido agregar el servicio, por favor intente de nuevo');
            }
          });
          }
      });
    } else{
      this.serviceForm.markAllAsTouched();
    }
  
    
  }


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  

  uploadAndGetUrl(): Observable<string> {
    if (this.files.length === 0) {
      return throwError(() => new Error('No files selected'));
    }
  
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'AutoCarePro');
    data.append('cloud_name', 'dhozqpfox');
  
    return this.uploadService.uploadImg(data).pipe(
      map(res => {
      
        return res.url;
      }),
      catchError((err) => {
        console.error('Error uploading image:', err);
        this.alertService.somethingWentWrong('Error subiendo la imagen', 'El servicio ha fallado al subir la imagen');
        return throwError(err);
      })
    );
  
  

  }


  createService(value: Partial<{ name: string | null; description: string | null; price: null; image: string | null; }>): Service {
    return {
      name: value.name || '',
      description: value.description || '',
      price: value.price || 0,
      image: value.image || ''
    }
  }


  get name(){
    return this.serviceForm.get('name');
  }

  get description(){
    return this.serviceForm.get('description');
  }

  get price(){
    return this.serviceForm.get('price');
  }
}
