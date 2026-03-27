import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/cart/cart.service';
import { AuthService } from '../../../core/service/auth/auth.service';
import { Iuser } from '../../../core/models/Iuser/iuser.interface';
import { WishlistService } from '../../../core/service/wishlist/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit, OnDestroy {

  isLoggedIn: Signal<boolean> = computed(() => this.authService.isLoggedIn())
  showList: WritableSignal<boolean> = signal(false);
  isMenuOpen: WritableSignal<boolean> = signal(false);
  cartItemsNumber: Signal<number> = computed(() => this.cartService.numberOfCartItems())
  wishlistItemsNumber: Signal<number> = computed(() => this.wishlistService.numWishListItems())
  userData: WritableSignal<Iuser> = signal({} as Iuser)
  timeoutId: any;

  private readonly platFormId = inject(PLATFORM_ID)
  private readonly cartService = inject(CartService)
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService)
  private readonly wishlistService = inject(WishlistService)



  ngOnInit(): void {
    this.getLoggedUserCart();
    this.getLoggedUserWishList();
    this.cheackOfUserIsLogin();
    this.getVerifyToken();
  }

  cheackOfUserIsLogin(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token') != undefined) {
        this.authService.isLoggedIn.set(true)
      } else {
        this.authService.isLoggedIn.set(false);
      }
    }
  }

  showListOfUser(): void {
    this.showList.update(value => !value);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  logOut(): void {
    this.removerTokenInLocalStorge();
    this.timeoutId = setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
    this.authService.isLoggedIn.set(false);
    this.showList.set(false);

  }

  removerTokenInLocalStorge(): void {
    if (isPlatformBrowser(this.platFormId)) {
      localStorage.removeItem('token')
    }
  }


  getLoggedUserCart(): void {
    if (isPlatformBrowser(this.platFormId)) {
      if (localStorage.getItem('token')) {
        this.cartService.getLoggedUserCart().subscribe({
          next: (res) => {
            if (res.status == "success") {
              this.cartService.numberOfCartItems.set(res.numOfCartItems)///
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      }
    }
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

          }
        })
      }
    }
  }


  navgiteToHome(): void {
    this.router.navigate(['/home'])
    this.isMenuOpen.set(false);
  }

  navgiteToShop(): void {
    this.router.navigate(['/shop'])
    this.isMenuOpen.set(false);
  }

  navgiteToCategories(): void {
    this.router.navigate(['/all-categories'])
    this.isMenuOpen.set(false);
  }

  navgiteToBrands(): void {
    this.router.navigate(['/brands'])
    this.isMenuOpen.set(false);
  }

  navgiteToWishlist(): void {
    this.router.navigate(['/wishlist'])
    this.isMenuOpen.set(false);
    this.showList.set(false);
  }

  navgiteToCart(): void {
    this.router.navigate(['/cart'])
    this.isMenuOpen.set(false);
  }

  navgiteToprofile(): void {
    this.router.navigate(['/profile'])
    this.isMenuOpen.set(false);
    this.showList.set(false);
  }

  navgiteToSupport(): void {
    this.router.navigate(['/support'])
    this.isMenuOpen.set(false);
  }

  navgiteToOrder(): void {
    this.router.navigate(['/allorders'])
    this.isMenuOpen.set(false);
    this.showList.set(false);
  }

  navgiteToAddresses(): void {
    this.router.navigate(['/profile/addresses'])
    this.isMenuOpen.set(false);
    this.showList.set(false);
  }
  navgiteToSettings(): void {
    this.router.navigate(['/profile/settings'])
    this.isMenuOpen.set(false);
    this.showList.set(false);
  }



  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);

  }

}
