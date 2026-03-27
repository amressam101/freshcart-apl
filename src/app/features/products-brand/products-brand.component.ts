import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { BrandsService } from '../../core/service/brands/brands.service';
import { IproductBrand } from '../../core/models/Iproduct-brand/iproduct-brand.interface';
import { finalize } from 'rxjs';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";

@Component({
  selector: 'app-products-brand',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './products-brand.component.html',
  styleUrl: './products-brand.component.css',
})
export class ProductsBrandComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly brandsService = inject(BrandsService)
  brand: WritableSignal<IproductBrand> = signal({} as IproductBrand)
  brandId: WritableSignal<string | null> = signal('')
  isLoading: WritableSignal<boolean> = signal(false)
  resultsNumber: WritableSignal<number> = signal(0)
  productList: WritableSignal<IProduct[]> = signal([]);


  ngOnInit(): void {
    this.getBrandIdFormRoute();
    this.getSpecificProduct();
  }

  getBrandIdFormRoute(): void {
    this.activatedRoute.paramMap.subscribe((url) => {
      this.brandId.set(url.get('id'))

    })
  }

  getSpecificProduct(): void {
    this.brandsService.getSpecificBrand(this.brandId()).subscribe({
      next: (res) => {
        this.brand.set(res.data)
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        this.getSpecificProductBrand();
      }
    })
  }

  getSpecificProductBrand(): void {
    this.isLoading.set(true)
    this.brandsService.getSpecificProductBrand(this.brand()._id).pipe(finalize(() => {
      this.isLoading.set(false);
    })).subscribe({
      next: (res) => {
        this.productList.set(res.data);
        this.resultsNumber.set(res.results)

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
