import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from "../app-routing.module";
import { HeaderComponent } from "./header.component";
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule ({
  declarations: [
    HeaderComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule{}