import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient)

  numberOfCartItems: WritableSignal<number> = signal(0);


  addProductToCart(prodId: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/cart`,
      {
        productId: prodId
      }
    )
  }

  getLoggedUserCart(): Observable<any> {
    return this.http.get(`${environment.baseUrl}api/v1/cart`)
  }

  removeItemFromCart(itemId: any): Observable<any> {
    return this.http.delete(`${environment.baseUrl}api/v1/cart/${itemId}`)
  }


  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}api/v1/cart`)
  }


  UpdateItemQuantity(itemId: any, itemCount: any): Observable<any> {
    return this.http.put(`${environment.baseUrl}api/v1/cart/${itemId}`,
      {
        count: itemCount
      }
    )
  }



  checkOutSession(cartId: any, data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, data)
  }


  createCashOrder(cartId: any, data: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}api/v1/orders/${cartId}`, data)
  }






}
