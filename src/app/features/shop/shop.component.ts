import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { ProductsService } from '../../core/service/products/products.service';
import { IProduct } from '../../core/models/IProduct/iproduct.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService)
  limitProducts: WritableSignal<number> = signal(0)

  productList: WritableSignal<IProduct[]> = signal([]);
  isloading: WritableSignal<boolean> = signal(false);


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.isloading.set(true);
    this.productsService.getAllProducts().pipe(finalize(() => {
      this.isloading.set(false);
    })).subscribe({
      next: (res) => {
        this.limitProducts.set(res.metadata.limit)
        this.productList.set(res.data)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
