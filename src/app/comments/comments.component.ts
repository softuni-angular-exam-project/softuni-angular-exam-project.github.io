import { Component, OnInit } from '@angular/core';

import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { Comment } from '../shared/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments!: Comment[];

  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getComments().subscribe((data) => {
      this.comments = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Comment
        }
      })
      // error ''
    }, (error) => {
      //error
    });
  }
}
