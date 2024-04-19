import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Service } from 'src/app/models/Service';
import { UploadImgService } from 'src/app/services/upload-img.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  constructor(private fb: FormBuilder, private uploadService: UploadImgService) { }
  files: File[] = [];

  ngOnInit(): void {
  }

  serviceForm = this.fb.group({
    name: [''],
    description: [''],
    price: [null],
    image: ['']
  });

  sumbit() {
    const service: Service = this.createService(this.serviceForm.value);
    console.log(service);
  }


  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  createService(value: Partial<{ name: string | null; description: string | null; price: null; image: string | null; }>): Service {
    return {
      name: value.name || '',
      description: value.description || '',
      price: value.price || 0,
      image: value.image || ''
    }
  }

  upload() {
    if (this.files.length === 0) { return; }

    const file_data = this.files[0];
    const data = new FormData();

    data.append('file', file_data);
    data.append('upload_preset', 'AutoCarePro');
    data.append('cloud_name', 'dhozqpfox');

    this.uploadService.uploadImg(data).subscribe({
      next: (res) => { 
        console.log(res);
        alert('Image uploaded successfully');
      },
      error: (err) => { console.log(err); },
    });
  }
}
