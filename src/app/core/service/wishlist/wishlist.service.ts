import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient)

  numWishListItems: WritableSignal<number> = signal(0)

  addProductToWishList(prodId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/wishlist`,
      {
        productId: prodId
      }
    )
  }

  removeProductFormWishList(prodId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}api/v1/wishlist/${prodId}`)
  }


  getLoggedUserWishList(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/wishlist`)
  }
}
