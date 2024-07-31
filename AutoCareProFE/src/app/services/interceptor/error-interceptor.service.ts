import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(`backend returned code ${error.status}, body was: ${JSON.stringify(error.error)}) `);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }
}
