import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarItemComponent } from './buy-car-item.component';

describe('BuyCarItemComponent', () => {
  let component: BuyCarItemComponent;
  let fixture: ComponentFixture<BuyCarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCarItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
