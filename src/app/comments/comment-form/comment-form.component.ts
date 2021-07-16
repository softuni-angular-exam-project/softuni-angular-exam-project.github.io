import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import { User } from 'src/app/shared/models/user.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {
  @Input() comment!: Comment;
  commnetForm!: FormGroup;

  user!: User;
  private _userSubscription!: Subscription;

  constructor(
    private _authservice: AuthService,
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this.commnetForm = new FormGroup(
      {commentArea: new FormControl(null, Validators.required)}
    );

    this._userSubscription = this._authservice.user.subscribe((user) => {
      this.user = user;      
    });
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  onSubmitComment(commnetForm: FormGroup) {
    if(commnetForm.invalid){
      return;
    }

    const userName = this.user.name;
    const email = this.user.email;
    const date = firebase.default.firestore.Timestamp.now();
    const description = commnetForm.value.commentArea.trim();
    const post: Comment = {userName, email, date, description};

    this._firestoreCollections.setComment(post)
    .then(() => {
      commnetForm.reset();
      //error = '';
    }, (error) => {

    })    
  }
}
