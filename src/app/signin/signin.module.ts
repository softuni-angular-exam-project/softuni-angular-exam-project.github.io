import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SigninComponent } from "./signin.component";

@NgModule ({
  declarations: [
    SigninComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SigninComponent}
    ])
  ],
  exports: [
    SigninComponent
  ]
})

export class SigninModule{}