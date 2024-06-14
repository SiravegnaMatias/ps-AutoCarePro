import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { productRequest } from 'src/app/models/ProductRequest';
import { Supplier } from 'src/app/models/Supplier';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryServiceService } from 'src/app/services/ecommerce/categoriesServices/category-service.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';
import { SupplierService } from 'src/app/services/ecommerce/suppliersServices/supplier.service';
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
  suppliers!:Supplier[];

  constructor(private router:Router, 
    private fb:FormBuilder, 
    private uploadService:UploadImgService,
    private alertService:AlertService,
    private categoryService:CategoryServiceService,
    private supplierService:SupplierService,
    private productService:ProductService

  ) { }
  
  ngOnInit(): void {
    this.formProducts = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200),Validators.minLength(5)]],
      price: ['',[Validators.min(1), Validators.required]],
      stock: ['',[Validators.min(1), Validators.required]],
      image: [''],
      category: ['',[Validators.required]],
      supplier: ['',[Validators.required]]
    });
    this.getCategories();
    this.getProviders();
  }


  backToProducts(){
    this.router.navigate(['home/shop/admin/products']);
  }

  sumbit(){
    
    const product:productRequest = this.formProducts.value;
    product.idCategory = Number(this.formProducts.get('category')?.value);
    product.idSupplier = Number(this.formProducts.get('supplier')?.value);
    
    if(this.formProducts.valid){

      if(this.files.length === 0){
        this.alertService.warning('Imagen no seleccionada', 'Por favor seleccione una imagen para el producto');
        return;
      }

      this.uploadAndGetUrl().subscribe({
        next: (url) => {  
          product.image  = url;
          this.productService.postProduct(product).subscribe({
            next: (data) => {
              this.alertService.succesfullLogin('El producto ha sido creado exitosamente');
              this.router.navigate(['home/shop/admin/products']);
            },
            error: (err) => {
              console.error('Error creating product:', err);
              this.alertService.somethingWentWrong('Error creando el producto', 'El servicio ha fallado al crear el producto');
            }
          });
        }
      });
    }else {
      this.formProducts.markAllAsTouched();
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
  

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error getting categories:', err);
      }
    });
  }

  getProviders(){
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Error getting suppliers:', err);
      }
    })
  }

  get name() { return this.formProducts.get('name'); }
  get description() { return this.formProducts.get('description'); }
  get price() { return this.formProducts.get('price'); }
  get stock() { return this.formProducts.get('stock'); }
  get category() { return this.formProducts.get('category'); }
  get supplier() {return this.formProducts.get('supplier')}
}