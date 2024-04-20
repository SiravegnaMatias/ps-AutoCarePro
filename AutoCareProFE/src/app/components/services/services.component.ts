import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit{
  services:Service[] = [];

  constructor(private service:ServiceManagmentService) { }
 
  ngOnInit(): void {
   this.service.getServices().subscribe({
    next: (res:Service[]) => {
      this.services = res;
   },
   error: (err) => {
     console.error('Error getting services:', err);
   }
  });
  }
}
