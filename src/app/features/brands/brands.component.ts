import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BrandsService } from '../../core/service/brands/brands.service';
import { Ibrands } from '../../core/models/Ibrands/ibrands.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  isLoading: WritableSignal<boolean> = signal(false);
  private readonly brandsService = inject(BrandsService)
  brandList: WritableSignal<Ibrands> = signal({} as Ibrands);

  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands(): void {
    this.isLoading.set(true)
    this.brandsService.getAllBrands().pipe(finalize(() => {
      this.isLoading.set(false)
    })).subscribe({
      next: (res) => {
        this.brandList.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
