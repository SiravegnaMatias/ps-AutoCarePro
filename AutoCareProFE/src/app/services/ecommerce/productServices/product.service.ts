import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { productRequest } from 'src/app/models/ProductRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private url:string = 'http://localhost:8080/products';

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url);
  }

  postProduct(product:productRequest):Observable<Product>{
    return this.http.post<Product>(this.url, product);
  }

  getProduct(id:number):Observable<Product>{  
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
