import { TestBed } from '@angular/core/testing';

import { CommentIdService } from './current-comment-id.service';

describe('CommentIdService', () => {
  let service: CommentIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
