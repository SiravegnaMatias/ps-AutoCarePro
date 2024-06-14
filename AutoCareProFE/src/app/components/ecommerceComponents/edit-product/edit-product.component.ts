import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Supplier } from 'src/app/models/Supplier';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryServiceService } from 'src/app/services/ecommerce/categoriesServices/category-service.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';
import { SupplierService } from 'src/app/services/ecommerce/suppliersServices/supplier.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent  implements OnInit{
  
  idProduct!:number;
  product!:Product;
  formProducts!:FormGroup;
  categories:Category[] = [];
  suppliers:Supplier[] = [];
  isDisabled:boolean=true;
  constructor(
              private route:ActivatedRoute,
              private productService:ProductService,
              private alertService:AlertService,
              private fb:FormBuilder,
              private categoryService:CategoryServiceService,
              private supplierService:SupplierService
  ){}


  ngOnInit(): void {
    this.initForm();
    this.formProducts.disable();
    this.getCategories();
    this.getSuppliers();

    this.idProduct = this.route.snapshot.params['id'];
    this.refreshProduct();
  }

  initForm(){
    this.formProducts = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(200),Validators.minLength(5)]],
      price: ['',[Validators.min(1), Validators.required]],
      stock: ['',[Validators.min(1), Validators.required]],
      image: [''],
      category: ['',[Validators.required]],
      supplier: ['',[Validators.required]]
    });
  }  
  confirmChanges(){
    if(this.formProducts.valid){
      //tirar el update y si sale bien 
      
      // this.refreshSupplier();
      //this.toggleEdit();
    }else {
      this.formProducts.markAllAsTouched();
    }
  }

  refreshProduct(){
    this.productService.getProduct(this.idProduct).subscribe({
      next: (data) => {
        this.product = data;
        this.formProducts.patchValue(this.product);
      },
      error: (err) => {
        console.error('Error getting product:', err);
        this.alertService.somethingWentWrong('Error obteniendo producto', 'No se ha podido obtener el producto, por favor intente de nuevo');
      }
    });
  }

  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.formProducts.disable();
    } else {
      this.formProducts.enable();
    }
  }
  

  cancelChanges() {
    this.refreshProduct();
    this.formProducts.markAsUntouched();
    this.isDisabled = true;
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

  getSuppliers(){
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
