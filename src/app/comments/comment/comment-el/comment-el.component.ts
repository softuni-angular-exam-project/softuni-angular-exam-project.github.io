import { Component, Input } from '@angular/core';

import { Comment } from 'src/app/shared/models/comment.model';
import { User } from 'src/app/shared/models/user.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { SharedParamsService } from 'src/app/shared/services/shared-params.service';

@Component({
  selector: 'app-comment-el',
  templateUrl: './comment-el.component.html',
  styleUrls: ['./comment-el.component.scss']
})
export class CommentElComponent {
  @Input() comment!: Comment;
  errorMsgOnGetUser: string = '';

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _sharedParamsService: SharedParamsService
  ) { }

  onShowUserInfo(email: string) {
    this._firestoreCollections.getUserData(email).subscribe(data => {
      const user = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as User
        }
      })
      const name = user[0].name;
      const email = user[0].email;
      const phoneCode = user[0].phoneCode;
      const phone = user[0].phone;
      const userImgUrl = user[0].userImgUrl;
      const shownUser = {name, email, phoneCode, phone, userImgUrl};      
      this._sharedParamsService.showUserInfo(shownUser);
      this.errorMsgOnGetUser = '';
    }, error => {
      this.errorMsgOnGetUser = error.message;
    })
  };
}
