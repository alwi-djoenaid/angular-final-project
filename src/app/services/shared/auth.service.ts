import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = "https://alwisfinalproject.herokuapp.com";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: { username: string, email: string, _id: string} = {username: '', email: '', _id: ''};

  constructor(private http: HttpClient, private router: Router) { }

  // Sign up
  signUp(user: User): Observable<any>{
    let api = `${this.endpoint}/Api/AuthManagement/Register`;
    return this.http.post(api, user)
  }

  signIn(user: User){
    return this.http.post<any>(`${this.endpoint}/Api/AuthManagement/Login`, user).pipe(catchError(this.handleError));
  }

  checkToken(): Observable<any>{
    let payload: {} = {
      token: localStorage.getItem('access_token'),
      refreshToken: localStorage.getItem('refresh_token'),
    }
    return this.http.post<any>(`${this.endpoint}/Api/AuthManagement/RefreshToken`, payload).pipe(catchError(this.handleError));
  }

  isLoggedIn(): boolean{
    let loggedIn = true;
    
    if(!localStorage.getItem('access_token') && !localStorage.getItem('refresh_token')){
      loggedIn = false;
    } else{
      this.checkToken().subscribe(res => {
        if(res.errors[0] == 'Token has expired. Please re-login'){
          loggedIn = false;
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      });
    }
    
    return loggedIn;
  }

  getToken(){
    return localStorage.getItem('access_token');
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
