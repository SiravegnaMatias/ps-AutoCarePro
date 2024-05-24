import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest, BookingResponse } from '../models/BookingRequest';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }

  bookings:Booking[] = [
    {
    id: 1,
    date: "19-05-2024 15:00pm",
    vehicle: "Toyota GR86",
    services: [
      {
        name: "Limpieza y puesta a punto",
        description: "Change oil and filter",
        price: 50,
        image: ""
      },
      {
        name: "Limpieza exterior",
        description: "Change brake pads and rotors",
        price: 100,
        image: ""
      },
      {
        name: "LLantas",
        description: "Change brake pads and rotors",
        price: 100,
        image: ""
      }
    ],
    status: "Solicitada"
  },
  {
    id: 2,
    date: "13-05-2024 10:00am",
    vehicle: "Honda Civic",
    services: [
      {
        name: "Limpieza exterior e interior",
        description: "Change brake pads and rotors",
        price: 100,
        image: "https://via.placeholder.com/150"
      }
    ],
    status: "Completada"
  },
  {
    id: 3,
    date: "16-05-2024 16:00pm",
    vehicle: "BMW M3",
    services: [
      {
        name: "Limpieza exterior",
        description: "Change brake pads and rotors",
        price: 100,
        image: "https://via.placeholder.com/150"
      }
    ],
    status: "En proceso"
  
  }
];
  private url:string = "http://localhost:8080/bookings";

  public addBooking(booking:BookingRequest):Observable<BookingResponse>{
    return this.http.post<BookingResponse>(this.url,booking);
  }

  public getBookings():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url);
  }

  public getBookingsById(id:number):Observable<Booking[]>{
    return this.http.get<Booking[]>(this.url + '/user/' + id);
  }

  getBookingsOff():Booking[]{
    return this.bookings;
  }

  getBookingByiDOff(id:number):Booking{
    return this.bookings.find(booking => booking.id === id)!;
  }
}
