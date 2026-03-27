import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient)

  getAllProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/products`)
  }

  getSpecificProduct(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/products/${id}`)
  }
}
