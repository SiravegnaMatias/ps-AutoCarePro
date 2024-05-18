import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingRequest } from '../models/BookingRequest';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  constructor(private http:HttpClient) { }

  private url:string = "http://localhost:8080/bookings";

  public addBooking(booking:BookingRequest):Observable<boolean>{
    return this.http.post<boolean>(this.url,booking);
  }
}
