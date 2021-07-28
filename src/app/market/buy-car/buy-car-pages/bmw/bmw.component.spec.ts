import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmwComponent } from './bmw.component';

describe('BmwComponent', () => {
  let component: BmwComponent;
  let fixture: ComponentFixture<BmwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmwComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
