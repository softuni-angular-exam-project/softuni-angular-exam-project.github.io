import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CategoriesInfoComponent } from './components/car-categories/categories-info/categories-info.component';
import { CategoriesRouterComponent } from './components/car-categories/categories-router/categories-router.component';
import { CarImagesComponent } from './components/car-images/car-images.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { GetUserInfoPipe } from './pipes/get-user-info.pipe';

@NgModule({
    declarations: [
        CarImagesComponent,
        CategoriesInfoComponent,
        CategoriesRouterComponent,
        LoadingSpinnerComponent,
        GetUserInfoPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CarImagesComponent,
        CategoriesInfoComponent,
        CategoriesRouterComponent,
        LoadingSpinnerComponent,
        GetUserInfoPipe
    ]
})
export class SharedModule{}