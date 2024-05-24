import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
constructor(private bookingService:BookingServiceService, private router:Router){}  
  bookings:Booking[] = [];


  ngOnInit(): void {
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res;
      }
    })
  }

  editBooking(id:number){
    this.router.navigate(['/home/bookings/edit',id]);
  }
}
