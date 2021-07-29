import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CommentsComponent } from "./comments.component";
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { SharedModule } from "../shared/shared.module";
import { CommentElComponent } from './comment/comment-el/comment-el.component';
import { CommentUserInfoComponent } from "./comment-user-info/comment-user-info.component";

@NgModule ({
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentFormComponent,
    CommentElComponent,
    CommentUserInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: CommentsComponent}
    ])
  ],
  exports: [
    CommentsComponent
  ]
})

export class CommentsModule{}