import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesInfoComponent } from './categories-info.component';

describe('CategoriesInfoComponent', () => {
  let component: CategoriesInfoComponent;
  let fixture: ComponentFixture<CategoriesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
