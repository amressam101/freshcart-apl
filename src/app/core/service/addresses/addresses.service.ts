import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {

  private readonly http = inject(HttpClient)


  addAddress(data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/addresses`, data)
  }

  removeAddress(addressId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}api/v1/addresses/${addressId}`)
  }

  getLoggedUserAddresses(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/addresses`)
  }

}
