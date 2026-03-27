import { Component, input } from '@angular/core';
import { Icategories } from '../../../core/models/Icategroies/icategories.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  item = input<Icategories>();
}
