import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestRegistration } from '../models/UserRequestRegistration';
import { Observable } from 'rxjs';
import { userLogin } from '../models/UserLogin';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  private url:string = 'http://localhost:8080/users/';

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.url+id);
  }
 
}
