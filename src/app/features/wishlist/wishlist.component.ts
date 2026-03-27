import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/service/wishlist/wishlist.service';
import { finalize } from 'rxjs';
import { Iwishlist } from '../../core/models/IWishlist/iwishlist.interface';
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../../core/service/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  private readonly platFormId = inject(PLATFORM_ID)


  wishList: WritableSignal<Iwishlist> = signal({} as Iwishlist)
  isLoading: WritableSignal<boolean> = signal(false);
  loadingUpdate = signal<Record<string, boolean>>({});
  loadingRemove = signal<Record<string, boolean>>({});



  ngOnInit(): void {
    this.getLoggedUserWishList();
  }

  getLoggedUserWishList(): void {
    this.isLoading.set(true)
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.wishlistService.getLoggedUserWishList().pipe(finalize(() => {
          this.isLoading.set(false)
        })).subscribe({
          next: (res) => {
            if (res.status === "success") {
              Promise.resolve().then(() => {
                this.wishList.set(res);
              });
              this.wishlistService.numWishListItems.set(res.count)
            }

          },
          error: (err) => {
            console.log(err);

          },
        })
      }
    }
  }


  removeProductFormWishList(prodId: string): void {
    this.loadingRemove.update(prev => ({
      ...prev,
      [prodId]: true
    }));
    this.wishlistService.removeProductFormWishList(prodId).pipe(finalize(() => {
      this.loadingRemove.update(prev => ({
        ...prev,
        [prodId]: false
      }));
    })).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.sweetAlertSuccessMesage(res.message)
        }

      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        this.getLoggedUserWishList();
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
      title: ` Success , ${succesMasg} `
    });
  }

  addProductToCart(prodId: string): void {
    this.loadingUpdate.update(prev => ({
      ...prev,
      [prodId]: true
    }));
    this.cartService.addProductToCart(prodId).pipe(finalize(() => {
      this.loadingUpdate.update(prev => ({
        ...prev,
        [prodId]: false
      }));
    })).subscribe({
      next: (res) => {
        if (res.status == "success") {

          // 1. show success mesage Alert
          this.sweetAlertSuccessMesage(res.message)

          this.cartService.numberOfCartItems.set(res.numOfCartItems)
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
