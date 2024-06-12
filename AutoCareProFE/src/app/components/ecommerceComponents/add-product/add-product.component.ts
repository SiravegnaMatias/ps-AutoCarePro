import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryServiceService } from 'src/app/services/ecommerce/categoriesServices/category-service.service';
import { UploadImgService } from 'src/app/services/upload-img.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  formProducts!:FormGroup;
  files: File[] = [];
  categories!:Category[];

  constructor(private router:Router, 
    private fb:FormBuilder, 
    private uploadService:UploadImgService,
    private alertService:AlertService,
    private categoryService:CategoryServiceService,
  ) { }
  
  ngOnInit(): void {
    this.formProducts = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      stock: [''],
      image: [''],
    });
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error getting categories:', err);
      }
    });
  }


  backToProducts(){
    this.router.navigate(['home/shop/admin/products']);
  }

  sumbit(){
    console.log(this.formProducts.value);
    if(this.files.length === 0){
      this.alertService.warning('Imagen no seleccionada', 'Por favor seleccione una imagen para el producto');
      return;

    }
    //al subir el form conseguir la url para mandar al backend
    //en el backend hay que implementar la logica de las categorias al crear el producto
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
  
}