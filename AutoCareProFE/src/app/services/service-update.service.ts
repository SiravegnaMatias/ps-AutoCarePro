import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceUpdateService {

  constructor() { }

  private serviceAddedSource = new Subject<void>();

  serviceAdded$ = this.serviceAddedSource.asObservable();

  serviceAdded() {
    this.serviceAddedSource.next();
  }
}
