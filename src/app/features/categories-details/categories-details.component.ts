import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/service/categories/categories.service';
import { Icategories } from '../../core/models/Icategroies/icategories.interface';
import { SubCategoriesService } from '../../core/service/sub-categories/sub-categories.service';
import { Isubcategories } from '../../core/models/Isubcategories/isubcategories.interface';

@Component({
  selector: 'app-categories-details',
  imports: [RouterLink],
  templateUrl: './categories-details.component.html',
  styleUrl: './categories-details.component.css',
})
export class CategoriesDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly categoriesService = inject(CategoriesService)
  private readonly subCategoriesService = inject(SubCategoriesService)
  subCategorieList: WritableSignal<Isubcategories> = signal({} as Isubcategories);
  categorie: WritableSignal<Icategories> = signal({} as Icategories);
  categorieId: WritableSignal<string | null> = signal('');

  ngOnInit(): void {
    this.getCategoriesIdFromRoute();
    this.getSpecificCategory();
    this.getAllSubCategories();
  }


  getCategoriesIdFromRoute(): void {
    this.activatedRoute.paramMap.subscribe((url) => {
      this.categorieId.set(url.get('id'));
    })
  }

  getSpecificCategory(): void {
    this.categoriesService.getSpecificCategory(this.categorieId()).subscribe({
      next: (res) => {
        this.categorie.set(res.data)
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  getAllSubCategories(): void {
    this.subCategoriesService.getAllSubCategories().subscribe({
      next: (res) => {
        this.subCategorieList.set(res)
        console.log(this.subCategorieList());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
