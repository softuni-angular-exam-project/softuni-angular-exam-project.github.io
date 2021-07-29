import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentUserInfoComponent } from './comment-user-info.component';

describe('CommentUserInfoComponent', () => {
  let component: CommentUserInfoComponent;
  let fixture: ComponentFixture<CommentUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
