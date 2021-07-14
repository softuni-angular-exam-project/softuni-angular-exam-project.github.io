import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProductsComponent } from "./products.component";

@NgModule ({
  declarations: [
    ProductsComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: ProductsComponent}
    ])
  ],
  exports: [
    ProductsComponent
  ]
})

export class ProductsModule{}