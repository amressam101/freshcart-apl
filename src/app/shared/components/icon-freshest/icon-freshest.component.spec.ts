import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFreshestComponent } from './icon-freshest.component';

describe('IconFreshestComponent', () => {
  let component: IconFreshestComponent;
  let fixture: ComponentFixture<IconFreshestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFreshestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconFreshestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
