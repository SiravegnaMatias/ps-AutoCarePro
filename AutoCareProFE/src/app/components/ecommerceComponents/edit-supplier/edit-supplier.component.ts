import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/models/Supplier';
import { AlertService } from 'src/app/services/alert.service';
import { SupplierService } from 'src/app/services/ecommerce/suppliersServices/supplier.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {

  supplierId!: string;
  supplier!: Supplier;
  supplierForm!: FormGroup;
  isDisabled: boolean = true;
  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private supplierService: SupplierService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {

    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      contactInfo: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.supplierForm.disable();

    this.supplierId = this.route.snapshot.paramMap.get('id') || '';

    this.refreshSupplier();

  }


  refreshSupplier() {
    this.supplierService.getSupplierById(Number(this.supplierId)).subscribe({
      next: (res) => {
        this.supplier = res;
        this.supplierForm.patchValue(this.supplier);
      }, error: (err) => {
        console.error('Error getting supplier:', err);
        this.alertService.somethingWentWrong('Error obteniendo el proveedor', 'No se ha podido obtener el proveedor, por favor intente de nuevo');
      }
    });
  }


  toggleEdit() {
    this.isDisabled = !this.isDisabled;
    if (this.isDisabled) {
      this.supplierForm.disable();
    } else {
      this.supplierForm.enable();
    }
  }

  cancelChanges() {
    this.refreshSupplier();
    this.supplierForm.markAsUntouched();
    this.isDisabled = true;
  }

  confirmChanges() {
    if (this.supplierForm.valid) {
      const supplier: Supplier = this.supplierForm.value;
      this.supplierService.updateSupplier(supplier,  Number(this.supplierId)).subscribe({
        next: (res) => {
          this.alertService.succesfullLogin('Proveedor actualizado correctamente');
          this.refreshSupplier();
          this.toggleEdit();
        },
        error: (err) => {
          console.error('Error updating supplier:', err);
          this.alertService.somethingWentWrong('Error actualizando el proveedor', 'No se ha podido actualizar el proveedor, por favor intente de nuevo');
        }
      });
    }else {
      this.supplierForm.markAllAsTouched();
    }
  }
  get name() {
    return this.supplierForm.get('name');
  }

  get email() {
    return this.supplierForm.get('email');
  }

  get contactInfo() {
    return this.supplierForm.get('contactInfo');
  }

  get address() {
    return this.supplierForm.get('address');
  }

}
