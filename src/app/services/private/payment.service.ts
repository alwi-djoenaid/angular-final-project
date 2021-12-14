import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { Payment } from './payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  endpoint: string = "https://alwisfinalproject.herokuapp.com";
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);

  constructor(private authService: AuthService, private http: HttpClient) { }

  getPaymentRecords(): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/Payment`, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  getPaymentById(id: number): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/Payment/${id}`, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  createPaymentRecord(payment: Payment): Observable<any>{
    return this.http.post(`${this.endpoint}/api/Payment`, payment, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  updatePaymentRecord(id: number, payment: Payment): Observable<any>{
    return this.http.put(`${this.endpoint}/api/Payment/${id}`, payment, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  deletePaymentRecord(id: number): Observable<any>{
    return this.http.delete(`${this.endpoint}/api/Payment/${id}`, { headers: this.headers }).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
    let msg = '';

    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
