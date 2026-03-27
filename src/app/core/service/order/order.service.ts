import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly http = inject(HttpClient)



  getUserOrders(userId: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/orders/user/${userId}`)
  }

}
