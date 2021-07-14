import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SignupComponent } from "./signup.component";

@NgModule ({
  declarations: [
    SignupComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: SignupComponent}
    ])
  ],
  exports: [
    SignupComponent
  ]
})

export class SignupModule{}