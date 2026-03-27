import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, PLATFORM_ID, signal, viewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { register } from 'swiper/element/bundle';
import { CategoriesComponent } from "../../shared/components/categories/categories.component";
import { CategoriesService } from '../../core/service/categories/categories.service';
import { Icategories } from '../../core/models/Icategroies/icategories.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/service/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { WishlistService } from '../../core/service/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { Iwishlist } from '../../core/models/IWishlist/iwishlist.interface';

@Component({
  selector: 'app-home',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, CategoriesComponent, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService)
  private readonly productsService = inject(ProductsService)
  private readonly wishlistService = inject(WishlistService)
  private readonly platFormId = inject(PLATFORM_ID)


  categorieList: WritableSignal<Icategories[]> = signal([]);
  wishList: WritableSignal<Iwishlist> = signal({} as Iwishlist);
  productList: WritableSignal<IProduct[]> = signal([]);
  show = signal(false);

  swiperRef = viewChild<ElementRef>('swiperRef');

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
    this.getLoggedUserWishList();
    register();


    setTimeout(() => {
      this.show.set(true);
    }, 50);

  }

  prevSlide(): void {
    this.swiperRef()?.nativeElement.swiper.slidePrev();
  }

  nextSlide(): void {
    this.swiperRef()?.nativeElement.swiper.slideNext();
  }


  getAllCategories(): void {
    this.categoriesService.getAllCategries().subscribe({
      next: (res) => {
        this.categorieList.set(res.data)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data)
      },
      error: (err) => {
        console.log(err);
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
            }

          },
          error: (err) => {
            console.log(err);

          }
        })
      }
    }
  }


}
