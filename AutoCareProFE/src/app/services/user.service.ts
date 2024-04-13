import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestRegistration } from '../models/UserRequestRegistration';
import { Observable } from 'rxjs';
import { userLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public registerUser(user: UserRequestRegistration):Observable<any>{
    return this.http.post('http://localhost:8080/users', user);
  }

  public loginUser(user: userLogin):Observable<any>{
    return this.http.post('http://localhost:8080/login', user);
  }
}
