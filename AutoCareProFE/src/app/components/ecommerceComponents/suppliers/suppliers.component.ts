import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Supplier } from 'src/app/models/Supplier';
import { AlertService } from 'src/app/services/alert.service';
import { SupplierService } from 'src/app/services/ecommerce/suppliersServices/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  isFilter: boolean = false;
  filterForm!: FormGroup;

  constructor(private supplierService: SupplierService,
    private alertService: AlertService,
    private router:Router,
    private fb:FormBuilder

  ) { }


  ngOnInit(): void {
    this.refreshSuppliers();
    this.initForm();
  }

  initForm() {
    this.filterForm = this.fb.group({
      id: [''],
      name: [''],
      email: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }


  refreshSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.filteredSuppliers = data;  
      
      },
      error: (err) => {
        console.error('Error getting suppliers:', err);
        this.alertService.somethingWentWrong('Error obteniendo proveedores', 'No se han podido obtener los proveedores, por favor intente de nuevo');
      }
    });
  }

  editSupplier(id: number) {
    this.router.navigate(['home/shop/admin/suppliers/edit', id]);
  }


  applyFilters() {
    const { id, name, email } = this.filterForm.value;

    this.filteredSuppliers = this.suppliers.filter(supplier => {
      return (!id || supplier.id.toString().includes(id))
        && (!name || supplier.name.toLowerCase().includes(name.toLowerCase()))
        && (!email || supplier.email.toLowerCase().includes(email.toLowerCase()));
    });
  }

  toggleFilter() {
    this.isFilter = !this.isFilter;
  }

  cleanFilters(){
    this.filterForm.reset();
    this.applyFilters();
  }

  }
