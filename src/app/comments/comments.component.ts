import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { Comment } from '../shared/models/comment.model';
import { CommentIdService } from './current-comment-id.service';
import { AuthService } from '../shared/services/auth.service';
import { CommentParameters, NavParameters } from '../shared/models/shared-params.model';
import { SharedParamsService } from '../shared/services/shared-params.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments!: Comment[];
  errorOnGetComments: string = '';

  isAuth!: boolean;
  private _isAuthSubscription!: Subscription;

  currentCommentId!: string;
  private _currentCommentIdSubscription!: Subscription;

  navParams!: NavParameters;
  private _sharedParamsSubscription!: Subscription;

  commentParams!: CommentParameters;
  private _commentParamsSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _currentCommentId: CommentIdService,
    private _authService: AuthService,
    private _sharedParamsService: SharedParamsService
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
        this.errorOnGetComments = '';
      }, (error) => {
        this.errorOnGetComments = error.message;
      }
    );

    this._currentCommentIdSubscription =
    this._currentCommentId.currentCommentIdSubject.subscribe((id) => {
      this.currentCommentId = id;
    });

    this._isAuthSubscription = this._authService.user.subscribe((user) => {
      this.isAuth = user ? true : false;
    });

    this._sharedParamsSubscription = this._sharedParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    });

    this._commentParamsSubscription = 
    this._sharedParamsService.initialCommentParamsSubject
    .subscribe((params) => {
      this.commentParams = params;
    });
  }

  ngOnDestroy(): void {
    this._currentCommentIdSubscription.unsubscribe();
    this._sharedParamsSubscription.unsubscribe();
    this._commentParamsSubscription.unsubscribe();
    this._isAuthSubscription.unsubscribe();
  }
}