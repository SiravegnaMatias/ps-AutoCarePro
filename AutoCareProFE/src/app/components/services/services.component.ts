import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';
import { ServiceUpdateService } from 'src/app/services/service-update.service';
import flatpickr from 'flatpickr';
import { FormBuilder } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { CarRequest, CarResponse } from 'src/app/models/CarRequest';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { BookingRequest } from 'src/app/models/BookingRequest';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  servicesSelcted: Service[] = [];
  userId: number = 0;
  cars: CarResponse[] = [];
  booking!:BookingRequest;
  constructor(
    private service: ServiceManagmentService,
    private srvUpd: ServiceUpdateService,
    private fb: FormBuilder,
    private logService: LoginService,
    private userService: UserService,
    private carService: CarService
  ) {
    // srvUpd.serviceAdded$.subscribe({
    //   next: () => {
    //     this.refreshServices();
    //   }
    // })


  }

  formServices: any = this.fb.group({
    date: [''],
    vehicle: [''],
    additionalNotes: [''],
  });

  ngAfterViewInit() {
    flatpickr('#datepicker', {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
    });

  }
  ngOnInit(): void {
    // this.refreshServices();
    this.services = this.service.getServicesOff();
    this.userId = this.logService.currentUserData.value.id;
    this.carService.getCarsById(this.userId).subscribe({
      next: (res: CarResponse[]) => {
        this.cars = res;
      },
      error: (err) => {
        console.error('Error getting cars:', err);
      }
    });
  }

  addService(service: Service) {
    this.servicesSelcted.push(service);
  }
  deleteService(index: number) {
    this.servicesSelcted.splice(index, 1);
  }
  refreshServices() {
    this.service.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = res;
      },
      error: (err) => {
        console.error('Error getting services:', err);
      }
    });
  }

  sumbit() {

    //ATENTO CON EL VALUE DE VEHICLE QUE ES STRING Y TIENE QUE SER NUMBER
    this.booking = {
      userId: this.userId,
      date: this.formServices.value.date,
      vehicleId: this.formServices.value.vehicle,
      additionalNotes: this.formServices.value.additionalNotes,
      services: this.servicesSelcted
    }

    console.log(this.booking);
  }

}
