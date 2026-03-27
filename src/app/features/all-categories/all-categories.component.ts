import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriesService } from '../../core/service/categories/categories.service';
import { Icategories } from '../../core/models/Icategroies/icategories.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-all-categories',
  imports: [RouterLink],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent implements OnInit {
  isLoading: WritableSignal<boolean> = signal(false);
  private readonly categoriesService = inject(CategoriesService);
  categorieList: WritableSignal<Icategories[]> = signal([]);



  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.isLoading.set(true);
    this.categoriesService.getAllCategries().pipe(finalize(() => {
      this.isLoading.set(false);
    })).subscribe({
      next: (res) => {
        this.categorieList.set(res.data)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

}
