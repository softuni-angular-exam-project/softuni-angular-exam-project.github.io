import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CommentsComponent } from "./comments.component";

@NgModule ({
  declarations: [
    CommentsComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: CommentsComponent}
    ])
  ],
  exports: [
    CommentsComponent
  ]
})

export class CommentsModule{}