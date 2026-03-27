import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsBrandComponent } from './products-brand.component';

describe('ProductsBrandComponent', () => {
  let component: ProductsBrandComponent;
  let fixture: ComponentFixture<ProductsBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsBrandComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsBrandComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
