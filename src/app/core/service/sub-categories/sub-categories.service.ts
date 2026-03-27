import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  private readonly http = inject(HttpClient);


  getAllSubCategories(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/subcategories`)
  }

  getSpecificSubCategory(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/subcategories/${id}`)
  }

  getAllSubCategoriesOnCategory(id: any): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/categories/${id}/subcategories`)
  }
}
