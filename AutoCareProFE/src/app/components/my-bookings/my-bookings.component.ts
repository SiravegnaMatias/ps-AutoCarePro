import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { BookingResponse } from 'src/app/models/BookingRequest';
import { Service } from 'src/app/models/Service';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { LoginService } from 'src/app/services/login.service';
import { BookingsComponent } from '../bookings/bookings.component';
import { AlertService } from 'src/app/services/alert.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css']
})
export class MyBookingsComponent implements OnInit {

 userId!:number;
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];
  isFilter:boolean = false;
  filterForm!: FormGroup;
  statusOptions: string[] = ['Solicitado', 'Aceptado', 'En proceso', 'Terminado','Cancelado'];


  
  constructor(private bookingService:BookingServiceService, private loginService:LoginService,private alert:AlertService,
              private fb:FormBuilder
  ) { }
  ngOnInit(): void {
    this.initForm();
    this.userId = this.loginService.currentUserData.value.id;
    this.refreshBookings();

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

  refreshBookings(){
    this.bookingService.getBookingsById(this.userId).subscribe({
      next: (res) => {
        this.bookings = res;
        this.filteredBookings = res;
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

  toggleFilter(){
    this.isFilter = !this.isFilter;
  }

  cleanFilters(){
    this.filterForm.reset();
    this.applyFilters();
  }
 
}
