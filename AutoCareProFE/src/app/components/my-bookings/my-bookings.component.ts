import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { BookingResponse } from 'src/app/models/BookingRequest';
import { Service } from 'src/app/models/Service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginService } from 'src/app/services/login.service';
import { BookingsComponent } from '../bookings/bookings.component';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

 userId!:number;
  bookings: Booking[] = [];
  constructor(private bookingService:BookingServiceService, private loginService:LoginService,private alert:AlertService) { }
  ngOnInit(): void {
    this.userId = this.loginService.currentUserData.value.id;
    this.refreshBookings();
  }

  refreshBookings(){
    this.bookingService.getBookingsById(this.userId).subscribe({
      next: (res) => {
        this.bookings = res;
      }
    });
  }

  getServices(services:Service[]):string{
    let servicesString:string = '';
    for (let index = 0; index < services.length; index++) {
      servicesString += services[index].name + ' - ';
    }

    return servicesString;
  }

  getTotal(booking: Booking) {
    let total = 0;
    booking.services.forEach(service => {
      total += service.price;
    });
    return total.toFixed(2);
  }
  cancelBooking(id:number){
    // alertify.confirm('Are you sure you want to cancel this booking?',()=>{
    //   this.bookingService.cancelBooking(id).subscribe({
    //     next: (res) => {
    //       alert('Booking cancelled successfully')
    //       this.refreshBookings();
    //     }
    //   })
    // })
  }

 
}
