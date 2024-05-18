import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { Service } from 'src/app/models/Service';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {
 
  bookings: Booking[] = [];
  constructor(private bookingService:BookingServiceService) { }
  ngOnInit(): void {
    this.bookings = this.bookingService.bookings;
  }

  getServices(services:Service[]):string{
    let servicesString:string = '';
    for (let index = 0; index < services.length; index++) {
      servicesString += services[index].name + ' - ';
    }

    return servicesString;
  }

}
