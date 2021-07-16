import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CommentsComponent } from "./comments.component";
import { CommentComponent } from './comment/comment.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule ({
  declarations: [
    CommentsComponent,
    CommentComponent,
    CommentFormComponent
  ],
  imports: [
    CommonModule,
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