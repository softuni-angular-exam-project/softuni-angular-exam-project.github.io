import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthActivate } from '../core/guards/auth.activate';
import { AuthResolver } from '../core/guards/auth.resolver';

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
      {path: '', component: SignupComponent,
        // resolve:{user: AuthResolver},
        canActivate: [AuthActivate], 
        data: {
          autenticationRequired: false,
          autenticationFailureRedirectUrl: '/home',
        }
      }
    ])
  ],
  exports: [
    SignupComponent
  ]
})

export class SignupModule{}