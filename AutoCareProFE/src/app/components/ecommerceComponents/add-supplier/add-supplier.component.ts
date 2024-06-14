import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierRequest } from 'src/app/models/SupplierRequest';
import { AlertService } from 'src/app/services/alert.service';
import { SupplierService } from 'src/app/services/ecommerce/suppliersServices/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit{

  supplierForm!:FormGroup;

  constructor(private router:Router, 
              private fb:FormBuilder,
              private alertService:AlertService,
              private supplierService:SupplierService
            ) 
{ }
  
  ngOnInit(): void {
    this.supplierForm = this.fb.group({
      name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      contactInfo: [null,Validators.required],
      email: ['',[Validators.required, Validators.email]],
    });
  }

  backToProviders(){
    this.router.navigate(['home/shop/admin/suppliers']);
  }

  sumbit(){
    if(this.supplierForm.valid){
      const supplier:SupplierRequest = this.supplierForm.value;
      this.supplierService.postSupplier(supplier).subscribe({
        next: (data) => {
          this.alertService.succesfullLogin('El proveedor fue creado exitosamente');
          this.supplierForm.reset();
          
        },
        error: (err) => {
          console.error('Error adding supplier:', err);
          this.alertService.somethingWentWrong('Error añadiendo el proveedor', 'No se ha podido agregar el proveedor, por favor intente de nuevo');
        }
      });
    }else{
      this.supplierForm.markAllAsTouched();
    }

  }


  get name(){
    return this.supplierForm.get('name');
  }

  get address(){
    return this.supplierForm.get('address');
  }

  get email(){
    return this.supplierForm.get('email');
  }

  get contactInfo(){
    return this.supplierForm.get('contactInfo');
  }
}
