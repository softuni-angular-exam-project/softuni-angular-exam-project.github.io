import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from "../app-routing.module";
import { UserInfoComponent } from './header/user-info/user-info.component';
import { FooterComponent } from "./footer/footer.component";
import { ScrollToTopComponent } from "./scroll-to-top/scroll-to-top.component";
import { HeaderComponent } from "./header/header.component";
import { AuthActivate } from "./guards/auth.activate";
import { AuthResolver } from "./guards/auth.resolver";
import { SharedModule } from "../shared/shared.module";

@NgModule ({
  declarations: [
    HeaderComponent,
    UserInfoComponent,
    FooterComponent,
    ScrollToTopComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule
  ],
  providers: [
    AuthActivate,
    AuthResolver
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ScrollToTopComponent
  ]
})

export class CoreModule{}