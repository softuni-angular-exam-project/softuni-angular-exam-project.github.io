import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { Comment } from '../shared/models/comment.model';
import { CommentIdService } from './current-comment-id.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments!: Comment[];

  isAuth!: boolean;
  private _isAuthSubscription!: Subscription;

  currentCommentId!: string;
  private _currentCommentIdSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _currentCommentId: CommentIdService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._firestoreCollections.getComments().subscribe(
      (data) => {
        this.comments = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Comment),
          };
        });
        // error ''
      },
      (error) => {
        //error
      }
    );

    this._currentCommentIdSubscription =
    this._currentCommentId.currentCommentIdSubject.subscribe((id) => {
      this.currentCommentId = id;
    });

    this._isAuthSubscription = this._authService.user.subscribe((user) => {
      this.isAuth = user ? true : false;
    })
  }

  ngOnDestroy(): void {
    this._currentCommentIdSubscription.unsubscribe();
    this._isAuthSubscription.unsubscribe();
  }
}
