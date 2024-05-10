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
  private urlRegisterUser = 'http://localhost:8080/auth/register';
  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.url+id);
  }

  registerUser(user:UserRequestRegistration):Observable<void>{
    return this.http.post<void>(this.urlRegisterUser,user);
  }
 
}
