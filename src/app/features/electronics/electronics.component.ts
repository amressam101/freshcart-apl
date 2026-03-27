import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { Icategories } from '../../core/models/Icategroies/icategories.interface';
import { finalize } from 'rxjs';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { IProduct } from '../../core/models/IProduct/iproduct.interface';

@Component({
  selector: 'app-electronics',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css',
})
export class ElectronicsComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)


  isLoading: WritableSignal<boolean> = signal(false)
  resultsNumber: WritableSignal<number> = signal(0)
  categorie: WritableSignal<Icategories> = signal({} as Icategories);
  productList: WritableSignal<IProduct[]> = signal([]);



  ngOnInit(): void {
    this.getSpecificCategory();
  }


  getSpecificCategory(): void {
    this.categoriesService.getSpecificCategory('6439d2d167d9aa4ca970649f').subscribe({
      next: (res) => {
        this.categorie.set(res.data)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getSpecificProducts();
      }
    })
  }

  getSpecificProducts(): void {
    this.isLoading.set(true);
    this.categoriesService.getSpecificProducts(this.categorie()._id).pipe(finalize(() => {
      this.isLoading.set(false);
    })).subscribe({
      next: (res) => {
        this.productList.set(res.data)
        this.resultsNumber.set(res.results)

      },
      error: (err) => {
        console.log(err);

      }
    })
  }
}
