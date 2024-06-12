import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private http:HttpClient) { }


  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>('http://localhost:8080/categories');
  }
}
