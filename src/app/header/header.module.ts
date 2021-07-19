import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
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
    AppRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})

export class HeaderModule{}