import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentIdService {
  currentCommentId: string = '';
  currentCommentIdSubject = new BehaviorSubject<string>(this.currentCommentId);

  constructor() { }

  setCurrentCommentId(currentCommentId: string) {
    this.currentCommentId = currentCommentId;
    this.currentCommentIdSubject.next(this.currentCommentId);
  }

  clearCurrentCommentId() {
    this.currentCommentId = '';
    this.currentCommentIdSubject.next(this.currentCommentId);
  }
}
