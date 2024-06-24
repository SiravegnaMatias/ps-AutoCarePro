import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/ecommerce/productServices/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent  implements OnInit{

  products!:Product[];
  filteredProducts: Product[] = [];
  isFilter: boolean = false;
  filterForm!: FormGroup;
  categories: string[] = ['Accesorios', 'Lavado Interior', 'Lavado Exterior'];
  
  constructor(
              private productService:ProductService,
              private alertService:AlertService,
              private router:Router,
              private fb:FormBuilder
  ){}
  
  ngOnInit(): void {
    this.initForm();
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (err) => {
        console.error('Error getting products:', err);
        this.alertService.somethingWentWrong('Error obteniendo productos', 'No se han podido obtener los productos, por favor intente de nuevo');
      }
    });
  }

  initForm() {
    this.filterForm = this.fb.group({
      id: [''],
      name: [''],
      category: [''],
      supplier: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { id, name, category, supplier } = this.filterForm.value;

    this.filteredProducts = this.products.filter(product => {
      return (!id || product.id.toString().includes(id))
        && (!name || product.name.toLowerCase().includes(name.toLowerCase()))
        && (!category || product.category.toLowerCase() === category.toLowerCase())
        && (!supplier || product.supplier.toLowerCase().includes(supplier.toLowerCase()));
    });
  }

  toggleFilter() {
    this.isFilter = !this.isFilter;
  }

  cleanFilters() {
    this.filterForm.reset();
    this.applyFilters();
  }

  editProduct(id:number){
    this.router.navigate(['home/shop/admin/products/edit',id]);
  }
}
