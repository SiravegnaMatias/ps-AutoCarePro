import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  
  booking!:Booking;
  selectedStatus: string = ' - ';
  availableStatuses: string[] = ['solicitada', 'aceptada', 'en proceso', 'listo para retirar']; // Define availableStatuses array

  constructor(private route: ActivatedRoute, private bookingService: BookingServiceService,private router:Router) { }
  
  ngOnInit(): void {
    const bookingId = this.route.snapshot.paramMap.get('id');
    this.booking = this.bookingService.getBookingByiDOff(Number(bookingId));
    this.selectedStatus = this.booking.status;
  
  }
   
  getTotal():string{
    let total = 0;
    this.booking.services.forEach(service => {
      total += service.price;
    });
    return total.toFixed(2);
  }

  sumbit() {
    this.booking.status = this.selectedStatus;
    console.log(this.booking);
  }

  back(){
    this.router.navigate(['/home/bookings']);
  }
}
