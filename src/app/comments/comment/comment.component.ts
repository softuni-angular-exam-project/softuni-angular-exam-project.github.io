import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment } from 'src/app/shared/models/comment.model';
import { CommentIdService } from '../current-comment-id.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() comment!: Comment;
  @Input() isAuth!: boolean;

  currentCommentId!: string;
  private _currentCommentIdSubscription!: Subscription;

  constructor(
    private _currentCommentId: CommentIdService
  ) { }

  ngOnInit(): void {
    this._currentCommentIdSubscription = this._currentCommentId.currentCommentIdSubject.subscribe((id) => {
      this.currentCommentId = id;
    })
  }

  ngOnDestroy(): void {
    this._currentCommentIdSubscription.unsubscribe();
  }

  onReply(currentCommentId: string) {
    this._currentCommentId.setCurrentCommentId(currentCommentId);
  }

  closeReply() {
    this._currentCommentId.clearCurrentCommentId();
  }
}
