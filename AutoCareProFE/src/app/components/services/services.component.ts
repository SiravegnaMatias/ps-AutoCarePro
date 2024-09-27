import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/Service';
import { ServiceManagmentService } from 'src/app/services/service-managment.service';
import { ServiceUpdateService } from 'src/app/services/service-update.service';
import flatpickr from 'flatpickr';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
import { CarRequest, CarResponse } from 'src/app/models/CarRequest';
import { UserService } from 'src/app/services/user.service';
import { CarService } from 'src/app/services/car.service';
import { BookingRequest } from 'src/app/models/BookingRequest';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  servicesSelcted: Service[] = [];
  userId: number = 0;
  currentUser!: User;
  cars: CarResponse[] = [];
  booking!: BookingRequest;
  
  constructor(
    private service: ServiceManagmentService,
    private srvUpd: ServiceUpdateService,
    private fb: FormBuilder,
    private logService: LoginService,
    private userService: UserService,
    private carService: CarService,
    private bookingService: BookingServiceService,
    private router: Router,
    private notification: AlertService,
    
  ) {
    srvUpd.serviceAdded$.subscribe({
      next: () => {
        this.refreshServices();
      }
    })


  }


  formServices: any = this.fb.group({
    date: [''],
    vehicle: ['',Validators.required],
    additionalNotes: [''],
  });

  get vehicle(){
    return this.formServices.get('vehicle');
  }
  ngAfterViewInit() {
    flatpickr('#datepicker', {
      enableTime: true,
      dateFormat: "d-m-Y H:i",
      minDate: "today",
      "disable": [
        function (date) {
          // return true to disable
          return date.getDay() === 0;
            //agregar funcion para desabilitar cuando haya mas de 3 reservas en esa hora
        }
      ],
      minTime: "09:00",
      maxTime: "19:00"
    });

  }
  ngOnInit(): void {
    this.refreshServices();
    this.userId = this.logService.currentUserData.value.id;
    this.userService.getUserById(this.userId).subscribe({
      next: (res: User) => {
        this.currentUser = res;
      },
      error: (err) => {
        console.error('Error getting user:', err);
      }
    });
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
    if(this.cars === null || this.cars.length === 0){
      this.notification.somethingWentWrong('Error','No tiene vehiculos registrados, por favor registre un vehiculo antes de reservar un servicio');
      return;
    }
    for (let index = 0; index < this.servicesSelcted.length; index++) {
      if (this.servicesSelcted[index].name === service.name) {
        return;
      }
      
    }
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
    this.booking = {
      userId: this.userId,
      date: this.formServices.value.date,
      vehicleId: Number(this.formServices.value.vehicle),
      additionalNotes: this.formServices.value.additionalNotes,
      services: this.servicesSelcted
    }

    if(this.booking.date === '' || this.booking.date === null){
      this.notification.somethingWentWrong('Error','Por favor seleccione una fecha y hora para su reserva');
      return;
    }
    if(this.servicesSelcted.length === 0){
      this.notification.somethingWentWrong('Error','Por favor seleccione al menos un servicio');
      return;
    }
    if(this.formServices.valid){
      this.bookingService.addBooking(this.booking).subscribe({
        next: (res) => {
          this.notification.succesfullLogin('Su reserva ha sido realizada con exito');
          this.formServices.reset();
          this.servicesSelcted = [];
          this.router.navigate(['/my-bookings']);
        },
        error: (err) => {
          console.error('Error adding booking:', err);
        }
      });
    } else {
      this.formServices.markAllAsTouched();
    }
   
  }

  getTotal(): string {
    let total: number = 0;
    this.servicesSelcted.forEach((service) => {
      total += service.price;
    });
    return total.toString();
  }

  editService(name: string) {
    this.router.navigate(['/home/services/edit', name]);
  }

  isAuthorized(roles: string[]): boolean {
    return roles.includes(this.currentUser.role.name);
  }

}
