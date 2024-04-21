import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Service } from 'src/app/models/Service';
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
                private srvUpd:ServiceUpdateService

  ) { }
  files: File[] = [];

  ngOnInit(): void {
  }

  serviceForm = this.fb.group({
    name: [''],
    description: [''],
    price: [null],
    image: ['']
  });

  async sumbit() {
    const service: Service = this.createService(this.serviceForm.value);
    
    this.uploadAndGetUrl().subscribe({
      next: (url) => {
        service.image = url;
       
        this.srv.addService(service).subscribe({
          next: (res) => {
            alert('Service added successfully');
            this.srvUpd.serviceAdded();
          },
          error: (err) => {
            console.error('Error adding service:', err);
            alert('Failed to add service');
          }
        });
        }
    });

  

    
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
        alert('Image uploaded successfully');
        return res.url;
      }),
      catchError((err) => {
        console.error('Error uploading image:', err);
        alert('Failed to upload image');
        return throwError(err);
      })
    );
  
    // return this.uploadService.uploadImg(data).pipe(
    //   map(res => {
    //     console.log(res);
    //     console.log(res.url);
    //     alert('Image uploaded successfully');
    //     return res.url;
    //   }),
    //   catchError((err) => {
    //     console.error(err);
    //     // Handle the error here
    //     return throwError(err);
    //   })
    // );

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
