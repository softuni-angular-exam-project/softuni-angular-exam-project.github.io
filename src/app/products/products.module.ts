import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { ProductsComponent } from "./products.component";
import { CarItemComponent } from './car-item/car-item.component';
import { LamborghiniComponent } from './car-pages/lamborghini/lamborghini.component';
import { PorscheComponent } from './car-pages/porsche/porsche.component';
import { SharedModule } from "../shared/shared.module";
import { AuthActivate } from "../core/guards/auth.activate";

@NgModule ({
  declarations: [
    ProductsComponent,
    CarItemComponent,
    LamborghiniComponent,
    PorscheComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ProductsComponent,
        canActivate: [AuthActivate], 
        data: {
          autenticationRequired: true,
          autenticationFailureRedirectUrl: '/signin',
        },
        children: [
          {path: 'lamborghini', component: LamborghiniComponent},
          {path: 'porsche', component: PorscheComponent},
          {path: '**', redirectTo: 'lamborghini'}
        ]
      }
    ])
  ],
  exports: [
    ProductsComponent
  ]
})

export class ProductsModule{}