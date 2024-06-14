import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/Supplier';
import { SupplierRequest } from 'src/app/models/SupplierRequest';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http:HttpClient) { }

  private url:string = 'http://localhost:8080/suppliers';


  getSuppliers():Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.url);
  }

  postSupplier(supplier:SupplierRequest):Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
  }

  getSupplierById(id:number):Observable<Supplier>{  
    return this.http.get<Supplier>(`${this.url}/${id}`);
  }

 updateSupplier(supplier:Supplier,id:number):Observable<Supplier>{
     return this.http.put<Supplier>(`${this.url}/${id}`, supplier);
  }
}
