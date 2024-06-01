import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { Status } from 'src/app/models/Status';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  bookingId!: string;
  booking!: Booking;
  statusList!: Status[];
  statusSelected: number = 0;
  constructor(private route: ActivatedRoute,
    private bookingService: BookingServiceService,
    private router: Router,
    private statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';
    this.bookingService.getBookingById(Number(this.bookingId)).subscribe({
      next: (res) => {
        this.booking = res;
      }, error: (err) => {
        console.error('Error getting booking:', err);
        alert('Failed to get booking');
      }
    });
    this.statusService.getStatuses().subscribe({
      next: (res) => {
        this.statusList = res;
      },
      error: (err) => {
        console.error('Error getting statuses:', err);
        alert('Failed to get statuses');
      }
    });

  }

  getTotal(): string {
    let total = 0;
    this.booking.services.forEach(service => {
      total += service.price;
    });
    return total.toFixed(2);
  }

  sumbit() {
    const selectedStatusId = this.getSelectedStatusName();
    this.bookingService.updateBookingStatus(Number(this.bookingId), Number(selectedStatusId)).subscribe({
      next: (res) => {
        alert('Booking updated successfully');
        this.router.navigate(['/home/bookings']);
      },
      error: (err) => {
        console.error('Error updating booking:', err);
        alert('Failed to update booking');
      }
    });
  }

  back() {
    this.router.navigate(['/home/bookings']);
  }

  

  getSelectedStatusName(): string {
    const selectElement = document.getElementById('status-select') as HTMLSelectElement;
    const selectedStatusId = selectElement.value; // This will hold the selected status ID
    return selectedStatusId;
  }
}
