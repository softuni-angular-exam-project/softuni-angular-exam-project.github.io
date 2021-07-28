import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentElComponent } from './comment-el.component';

describe('CommentElComponent', () => {
  let component: CommentElComponent;
  let fixture: ComponentFixture<CommentElComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentElComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentElComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
