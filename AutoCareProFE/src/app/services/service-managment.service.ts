import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/Service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagmentService {

  constructor(private http:HttpClient) { }

  public addService(service:Service):Observable<Service> {
    return this.http.post<Service>('http://localhost:8080/services',service);
  }

  public getServices():Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:8080/services');
  }
}
