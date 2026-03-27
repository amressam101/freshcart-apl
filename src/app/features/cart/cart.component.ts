import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/service/cart/cart.service';
import { Icart } from '../../core/models/ICart/icart.interface';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)



  isLoadingPage: WritableSignal<boolean> = signal(false);
  isLoadingRemove: WritableSignal<boolean> = signal(false);
  loadingUpdate: Record<string, boolean> = {};
  cartDetails: WritableSignal<Icart> = signal({} as Icart)





  ngOnInit(): void {
    this.getLoggedUserCart();
  }


  freeShippingProgress(): number {
    const total = this.cartDetails()?.data?.totalCartPrice || 0;
    const percentage = (total / 500) * 100;
    return Math.min(percentage, 100);
  }


  remainingForFreeShipping(): number {
    const total = this.cartDetails()?.data?.totalCartPrice || 0;
    return Math.max(500 - total, 0);
  }


  getLoggedUserCart(): void {
    this.isLoadingPage.set(true);
    this.cartService.getLoggedUserCart().pipe(finalize(() => {
      this.isLoadingPage.set(false)
    })).subscribe({
      next: (res) => {
        if (res.status == "success") {
          this.cartDetails.set(res)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  deleteItemFromCart(itemId: string): void {
    this.loadingUpdate[itemId] = true;
    this.cartService.removeItemFromCart(itemId).pipe(finalize(() => {
      this.loadingUpdate[itemId] = false;
    })).subscribe({
      next: (res) => {
        if (res.status == "success") {
          this.cartDetails.set(res)
          this.cartService.numberOfCartItems.set(res.numOfCartItems)
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  claerCartItem(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          // 1. show success mesage Alert
          this.sweetAlertSuccessMesage(res.message)
          this.cartDetails.set({} as Icart)
          this.cartService.numberOfCartItems.set(0)

        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  updateQuantity(itemId: any, itemCount: any): void {
    this.loadingUpdate[itemId] = true;
    this.cartService.UpdateItemQuantity(itemId, itemCount).pipe(finalize(() => {
      this.loadingUpdate[itemId] = false;
    })).subscribe({
      next: (res) => {
        if (res.status == "success") {
          this.cartDetails.set(res)
        }

      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  sweetAlertSuccessMesage(succesMasg: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,

      background: "#f3f4f6",
      color: "#6b7280",

      customClass: {
        popup: "rounded-xl shadow-md",
        title: "font-medium text-gray-500"
      },

      didOpen: (toast) => {
        // progress bar color
        const progress = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
        if (progress) {
          progress.style.background = "#22c55e"; // green-500
        }

        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    Toast.fire({
      icon: "success",
      title: ` ${succesMasg}`
    });
  }

}
