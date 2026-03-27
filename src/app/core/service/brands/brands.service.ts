import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly http = inject(HttpClient);


  getAllBrands(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/brands`)
  }

  getSpecificProductBrand(prodId: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/products?brand=${prodId}`)
  }

  getSpecificBrand(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/brands/${id}`)
  }
}
