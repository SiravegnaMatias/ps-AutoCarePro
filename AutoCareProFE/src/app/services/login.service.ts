import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { CurrentUser } from '../models/CurrentUser';
import { userLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({token:'',id:0}); 

  constructor(private http:HttpClient) {
    let user = sessionStorage.getItem('currentUser');
    if(user){
      this.currentUserData.next(JSON.parse(user));
      this.currentUserLoginOn.next(true);
    }
   }
  private url:string = 'http://localhost:8080/auth/login';

  login(credentials: userLogin):Observable<CurrentUser> {
    return this.http.post<CurrentUser>(this.url, credentials).pipe(
      tap((user: CurrentUser) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('token', user.token);
        this.currentUserData.next(user);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('An error occurred:', error.error);
    }else{
      console.error( `backend returned code ${error.status}, body was: ${error.error} `)
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  logOut(){
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    this.currentUserData.next({token:'',id:0});
    this.currentUserLoginOn.next(false);
  }

  getToken():string{
    return this.currentUserData.value.token;
  }
  
}
