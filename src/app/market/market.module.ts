import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MarketComponent } from "./market.component";

@NgModule ({
  declarations: [
    MarketComponent
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: MarketComponent}
    ])
  ],
  exports: [
    MarketComponent
  ]
})

export class MarketModule{}