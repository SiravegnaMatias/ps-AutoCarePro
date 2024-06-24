import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { BookingServiceService } from 'src/app/services/booking-service.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookings:Booking[] = [];
  filteredBookings: Booking[] = [];
  isFilter:boolean = false;
  filterForm!: FormGroup;
  statusOptions: string[] = ['Solicitado', 'Aceptado', 'En proceso', 'Terminado','Cancelado'];

  
constructor(private bookingService:BookingServiceService, private router:Router,private fb:FormBuilder){}  


  ngOnInit(): void {
    this.initForm();

    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        this.filteredBookings = res;
      }
    })
  }
  
  initForm(){

    this.filterForm = this.fb.group({
      bookingId: [''],
      vehicleName: [''],
      status: ['']
    });

    this.filterForm.valueChanges.subscribe(values => {
      this.applyFilters();
    });
  }

  applyFilters() {
    const { bookingId, vehicleName, status } = this.filterForm.value;

    this.filteredBookings = this.bookings.filter(booking => {
      return (!bookingId || booking.id.toString().includes(bookingId))
        && (!vehicleName || booking.vehicle.toLowerCase().includes(vehicleName.toLowerCase()))
        && (!status || booking.status.toLowerCase().includes(status.toLowerCase()));
    });
  }
  editBooking(id:number){
    this.router.navigate(['/home/bookings/edit',id]);
  }

  toggleFilter(){
    this.isFilter = !this.isFilter;
  }

  cleanFilters(){
    this.filterForm.reset();
    this.applyFilters();
  }
}
