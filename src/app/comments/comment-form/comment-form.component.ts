import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import { User } from 'src/app/shared/models/user.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { CommentIdService } from '../current-comment-id.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit, OnDestroy {
  commnetForm!: FormGroup;

  currentCommentId!: string;
  private _currentCommentIdSubscription!: Subscription;

  user!: User;
  private _userSubscription!: Subscription;

  errorOnAddComment: string = '';
  errorOnAddReply: string = '';

  constructor(
    private _authService: AuthService,
    private _firestoreCollections: FirestoreCollectionsService,
    private _currentCommentId: CommentIdService
  ) {}

  ngOnInit(): void {
    this.commnetForm = new FormGroup({
      commentArea: new FormControl(null, Validators.required),
    });

    this._userSubscription = this._authService.user.subscribe((user) => {
      this.user = user;
    });

    this._currentCommentIdSubscription =
      this._currentCommentId.currentCommentIdSubject.subscribe((id) => {
        this.currentCommentId = id;
      });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
    this._currentCommentIdSubscription.unsubscribe();
  }

  onSubmitComment(commnetForm: FormGroup) {
    if (commnetForm.invalid) {
      return;
    }

    const userName = this.user.name;
    const email = this.user.email;
    const date = firebase.default.firestore.Timestamp.now();
    const description = commnetForm.value.commentArea.trim();

    if (!this.currentCommentId) {
      //add comment
      const post: Comment = { userName, email, date, description };

      this._firestoreCollections.setComment(post).then(
        () => {
          commnetForm.reset();
          this.errorOnAddComment = '';
        },
        (error) => {
          this.errorOnAddComment = error.message;
        }
      );
    } else {
      //add reply
      const commentId = this.currentCommentId;
      const post: Comment = { userName, email, date, description, commentId };

      this._firestoreCollections.setReply(post).then(
        () => {
          commnetForm.reset();
          this._currentCommentId.clearCurrentCommentId();
          this.errorOnAddReply = '';
        },
        (error) => {
          this.errorOnAddReply = error.message;
        }
      );
    }
  }
}
