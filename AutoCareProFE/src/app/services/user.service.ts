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
  users:User[] = [{
 
    firstName:'John',
    lastName:'Doe',
    email:'jhondoe@mail.com',
    role: {id:1,name:'ADMIN'},
    address:'122st'
  },
  {
    firstName:'Jane',
    lastName:'Doe',
    email:'janedoe@mail.com',
    role: {id:1,name:'CLIENT'},
    address:'321st'
  },
  {
    firstName:'Matias',
    lastName:'Siravegna',
    email:'matisiravegna@mail.com',
    role: {id:1,name:'DETAILER'},
    address:'654st'
  }
];
  constructor(private http:HttpClient) { }
  private url:string = 'http://localhost:8080/users/';
  private urlRegisterUser = 'http://localhost:8080/auth/register';
  
  
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.url+id);
  }

  registerUser(user:UserRequestRegistration):Observable<void>{
    return this.http.post<void>(this.urlRegisterUser,user);
  }

  getCarsById(id:number):any{
    return this.http.get<any>(this.url+id+'/cars');
  }

  getUsersOff():User[]{
    return this.users;
  }
 
}
