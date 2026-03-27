import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/service/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { register } from 'swiper/element/bundle';
import { isPlatformBrowser, NgClass } from '@angular/common';
import Swal from 'sweetalert2';
import { CartService } from '../../core/service/cart/cart.service';
import { finalize } from 'rxjs';
import { WishlistService } from '../../core/service/wishlist/wishlist.service';
import { Iwishlist } from '../../core/models/IWishlist/iwishlist.interface';

@Component({
  selector: 'app-product-details',
  host: { ngSkipHydration: 'true' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, NgClass],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  private readonly platFormId = inject(PLATFORM_ID)

  showDetails: WritableSignal<boolean> = signal(true);
  showReviews: WritableSignal<boolean> = signal(false);
  showRefurns: WritableSignal<boolean> = signal(false);
  isLoading: WritableSignal<boolean> = signal(false);
  isLoadingWishList: WritableSignal<boolean> = signal(false)

  prodcutId: WritableSignal<string | null> = signal('');
  prodData: WritableSignal<IProduct> = signal({} as IProduct)
  wishList: WritableSignal<Iwishlist> = signal({} as Iwishlist);


  discountPercent = computed(() => {
    const product = this.prodData();

    if (!product.priceAfterDiscount) return 0;

    return Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100
    );
  });


  stars = computed(() => {
    const rating = this.prodData().ratingsAverage;

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

  // حساب نسبة كل star
  getStarPercentage(star: number): number {
    const reviews = this.prodData().reviews;
    if (!reviews || reviews.length === 0) return 0;
    const count = reviews.filter(r => r.rating === star).length;
    return Math.round((count / reviews.length) * 100);
  }

  // حساب الـ average
  getAverageRating(): number {
    const reviews = this.prodData().reviews;
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / reviews.length) * 10) / 10;
  }

  toggleDetails(): void {
    this.showDetails.set(true);
    this.showReviews.set(false);
    this.showRefurns.set(false);
  }

  toggleReviews(): void {
    this.showReviews.set(true);
    this.showRefurns.set(false);
    this.showDetails.set(false);
  }

  toggleRefurns(): void {
    this.showRefurns.set(true);
    this.showReviews.set(false);
    this.showDetails.set(false);

  }


  ngOnInit(): void {
    this.getProdcutIdFromRoute();
    register();
  }

  getProdcutIdFromRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.prodcutId.set(id);

        this.getSpecificProduct(id);
      }
    });
  }
  getSpecificProduct(id: string): void {
    this.productsService.getSpecificProduct(id).subscribe({
      next: (res) => {
        this.prodData.set(res.data);
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
      title: ` Success , ${succesMasg} `
    });
  }

  addProductToCart(prodId: string): void {
    this.isLoading.set(true);
    this.cartService.addProductToCart(prodId).pipe(finalize(() => {
      this.isLoading.set(false);
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
              this.wishList.set(res);
              console.log(res);
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

  isInWishlist(productId: string): boolean {
    return this.wishList()?.data?.some(item => item._id === productId);
  }

}
