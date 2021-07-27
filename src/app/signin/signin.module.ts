import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SigninComponent } from "./signin.component";
import { SharedModule } from "../shared/shared.module";

@NgModule ({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,    
    SharedModule,
    RouterModule.forChild([
      {path: '', component: SigninComponent}
    ])
  ],
  exports: [
    SigninComponent
  ]
})

export class SigninModule{}