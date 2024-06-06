import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/Booking';
import { Status } from 'src/app/models/Status';
import { AlertService } from 'src/app/services/alert.service';
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
    private statusService: StatusService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id') || '';
    this.bookingService.getBookingById(Number(this.bookingId)).subscribe({
      next: (res) => {
        this.booking = res;
      }, error: (err) => {
        console.error('Error getting booking:', err);
        this.alertService.somethingWentWrong('Error obteniendo la reserva', 'No se ha podido obtener la reserva, por favor intente de nuevo');
      }
    });
    this.statusService.getStatuses().subscribe({
      next: (res) => {
        this.statusList = res;
      },
      error: (err) => {
        console.error('Error getting statuses:', err);
        this.alertService.somethingWentWrong('Error obteniendo los estados', 'No se ha podido obtener los estados, por favor intente de nuevo');
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
        this.alertService.succesfullLogin('Reserva actualizada correctamente');
        this.router.navigate(['/home/bookings']);
      },
      error: (err) => {
        console.error('Error updating booking:', err);
        this.alertService.somethingWentWrong('Error actualizando la reserva', 'No se ha podido actualizar la reserva, por favor intente de nuevo');
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
