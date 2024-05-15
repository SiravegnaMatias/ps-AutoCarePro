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

  public getServicesOff():Service[] {
    return [
      {
        
        name: 'Lavado full',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/f_auto,q_auto/v1/AutoCarePro/grbepiyqaxqp5fwkt8a8',
        description: 'lavado full todos los detalles todos los chiches',
        price: 150.43
      },
      {
        name: 'Interior',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713587902/AutoCarePro/iafcq3wbzntv2hvkr9ke.jpg',
        description: 'Aseo interior, limpieza de tapiceria y todos los chiches',
        price: 10020
      },
      {
        name: 'Llantas max',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713587840/AutoCarePro/b7h68crkl0bbxs3cxzot.jpg',
        description: 'Saca a relucir los llantas cual teclas de ecko',
        price: 1500
      },
      {
        name: 'Pulido',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713663246/AutoCarePro/jqcbdzhxwwsd9xvabppr.jpg',
        description: 'Saca mas brillo que el pelado guardiola',
        price: 21302
      },{
        
        name: 'Lavado full',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/f_auto,q_auto/v1/AutoCarePro/grbepiyqaxqp5fwkt8a8',
        description: 'lavado full todos los detalles todos los chiches',
        price: 150.43
      },
      {
        name: 'Interior',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713587902/AutoCarePro/iafcq3wbzntv2hvkr9ke.jpg',
        description: 'Aseo interior, limpieza de tapiceria y todos los chiches',
        price: 10020
      },
      {
        name: 'Llantas max',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713587840/AutoCarePro/b7h68crkl0bbxs3cxzot.jpg',
        description: 'Saca a relucir los llantas cual teclas de ecko',
        price: 1500
      },
      {
        name: 'Pulido',
        image: 'https://res.cloudinary.com/dhozqpfox/image/upload/v1713663246/AutoCarePro/jqcbdzhxwwsd9xvabppr.jpg',
        description: 'Saca mas brillo que el pelado guardiola',
        price: 21302
      }
    ];
  }
}
