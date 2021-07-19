import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoriesInfoComponent } from './car-categories/categories-info/categories-info.component';
import { CategoriesRouterComponent } from './car-categories/categories-router/categories-router.component';
import { CarImagesComponent } from './car-images/car-images.component';

@NgModule({
    declarations: [
        CarImagesComponent,
        CategoriesInfoComponent,
        CategoriesRouterComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CarImagesComponent,
        CategoriesInfoComponent,
        CategoriesRouterComponent
    ]
})
export class SharedModule{}