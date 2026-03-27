import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);

  getAllCategries(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/categories`)
  }

  getSpecificProducts(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/products?category=${id}`)
  }


  getSpecificCategory(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/categories/${id}`)
  }

}
