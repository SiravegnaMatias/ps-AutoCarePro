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

  getBookingById(id:number):Observable<Booking>{
    return this.http.get<Booking>(this.url + '/' + id);
  }

  public updateBookingStatus(id:number, status:number):Observable<Booking>{
    return this.http.patch<Booking>(`${this.url}/${id}/status`, { status: status });
  }
  
  public cancelBooking(id:number):Observable<Booking>{
    return this.http.get<Booking>(`${this.url}/cancel/${id}`);

  }
}
