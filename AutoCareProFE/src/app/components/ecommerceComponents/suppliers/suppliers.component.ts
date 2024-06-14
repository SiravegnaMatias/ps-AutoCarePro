import { Component, OnInit } from '@angular/core';
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

  constructor(private supplierService: SupplierService,
    private alertService: AlertService,
    private router:Router

  ) { }


  ngOnInit(): void {
    this.refreshSuppliers();
   
  }

  refreshSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      
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
  }
