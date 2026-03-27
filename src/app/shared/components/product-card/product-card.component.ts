import { Component, computed, inject, input, InputSignal, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IProduct } from '../../../core/models/IProduct/iproduct.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../core/service/cart/cart.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { Iwishlist } from '../../../core/models/IWishlist/iwishlist.interface';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {

  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  private readonly platFormId = inject(PLATFORM_ID)

  data: InputSignal<IProduct> = input.required<IProduct>()
  wishList: InputSignal<Iwishlist | undefined> = input<Iwishlist>()
  isLoadingCart: WritableSignal<boolean> = signal(false)
  isLoadingWishList: WritableSignal<boolean> = signal(false)




  discountPercent = computed(() => {
    const product = this.data();

    if (!product.priceAfterDiscount) return 0;

    return Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100
    );
  });

  stars = computed(() => {
    const rating = this.data().ratingsAverage;

    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    const starsArray = [];

    for (let i = 0; i < fullStars; i++) {
      starsArray.push('full');
    }

    if (hasHalf) {
      starsArray.push('half');
    }

    while (starsArray.length < 5) {
      starsArray.push('empty');
    }

    return starsArray;
  });

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
    this.isLoadingCart.set(true);
    this.cartService.addProductToCart(prodId).pipe(finalize(() => {
      this.isLoadingCart.set(false);
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


  addProductToWishList(prodId: string): void {
    this.isLoadingWishList.set(true);
    this.wishlistService.addProductToWishList(prodId).pipe(finalize(() => {
      this.isLoadingWishList.set(false);
    })).subscribe({
      next: (res) => {
        if (res.status === "success") {
          console.log(res);
          this.sweetAlertSuccessMesage(res.message);
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


  getLoggedUserWishList(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.wishlistService.getLoggedUserWishList().subscribe({
          next: (res) => {
            if (res.status === "success") {
              this.wishlistService.numWishListItems.set(res.count)
            }

          },
          error: (err) => {
            console.log(err);

          }
        })
      }
    }
  }

  isInWishlist(productId: string): boolean | undefined {
    return this.wishList()?.data?.some(item => item._id === productId);
  }

}
