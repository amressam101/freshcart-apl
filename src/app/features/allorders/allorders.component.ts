import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { OrderService } from '../../core/service/order/order.service';
import { AuthService } from '../../core/service/auth/auth.service';
import { Iuser } from '../../core/models/Iuser/iuser.interface';
import { DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { Iorder, IorderUI } from '../../core/models/IOrder/iorder.interface';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe, NgClass],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {

  private readonly orderService = inject(OrderService)
  private readonly authService = inject(AuthService)
  private readonly platFormId = inject(PLATFORM_ID)


  userData: WritableSignal<Iuser> = signal({} as Iuser)
  orders: WritableSignal<IorderUI[]> = signal([]);
  isLoadding: WritableSignal<boolean> = signal(false);


  ngOnInit(): void {
    this.getVerifyToken();
  }

  getVerifyToken(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.authService.getVerifyToken().subscribe({
          next: (res) => {
            if (res.message === "verified") {
              this.userData.set(res.decoded)
            }
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.getUserOrders();
          }
        })
      }
    }
  }

  getUserOrders(): void {
    this.isLoadding.set(true);
    this.orderService.getUserOrders(this.userData().id).pipe(finalize(() => {
      this.isLoadding.set(false);
    })).subscribe({
      next: (res: Iorder[]) => {
        const ordersWithExpandState = res.map(order => ({
          ...order,
          isExpanded: false
        }));

        this.orders.set(ordersWithExpandState);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  toggleOrderDetails(orderId: string): void {
    this.orders.update(orders =>
      orders.map(order =>
        order._id === orderId
          ? { ...order, isExpanded: !order.isExpanded }
          : order
      )
    );
  }


}
