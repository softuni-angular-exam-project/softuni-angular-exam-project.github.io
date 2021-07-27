import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MatSelectModule } from '@angular/material/select';

import { SignupComponent } from "./signup.component";
import { SharedModule } from "../shared/shared.module";

@NgModule ({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: SignupComponent}
    ])
  ],
  exports: [
    SignupComponent
  ]
})

export class SignupModule{}