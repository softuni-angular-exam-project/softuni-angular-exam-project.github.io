import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from '@angular/material/select';

import { MarketComponent } from "./market.component";
import { AudiComponent } from './buy-car/buy-car-pages/audi/audi.component';
import { BmwComponent } from './buy-car/buy-car-pages/bmw/bmw.component';
import { SharedModule } from "../shared/shared.module";
import { SellCarComponent } from './sell-car/sell-car.component';
import { BuyCarItemComponent } from './buy-car-item/buy-car-item.component';
import { BuyCarComponent } from './buy-car/buy-car.component';

@NgModule ({
  declarations: [
    MarketComponent,
    AudiComponent,
    BmwComponent,
    SellCarComponent,
    BuyCarItemComponent,
    BuyCarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule.forChild([
      {path: '', component: MarketComponent, 
        children: [
            {path: 'buy', component: BuyCarComponent,
            children: [
              {path: 'audi', component: AudiComponent},
              {path: 'bmw', component: BmwComponent},
              {path: '**', redirectTo: 'audi'}
            ]},
          {path: 'sell', component: SellCarComponent},
          {path: '**', redirectTo: 'buy'}
        ]
      }
    ])
  ],
  exports: [
    MarketComponent
  ]
})

export class MarketModule{}