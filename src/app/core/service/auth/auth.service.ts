import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient)

  isLoggedIn: WritableSignal<boolean> = signal(false);


  SignUp(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/auth/signup`, data)
  }


  SignIn(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/auth/signin`, data)
  }

  forgotPassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/auth/forgotPasswords`, data)
  }

  verifyResetCode(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/auth/verifyResetCode`, data)
  }


  updateLoggedUserPassword(data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}api/v1/users/changeMyPassword`, data)
  }

  resetPassword(data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}api/v1/auth/resetPassword`, data)
  }


  updateLoggedUserData(data: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}api/v1/users/updateMe/`, data)
  }

  getAllUser(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/users`)
  }

  getVerifyToken(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/auth/verifyToken`)
  }






}
