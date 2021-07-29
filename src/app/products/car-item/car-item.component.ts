import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Car } from 'src/app/shared/models/car.model';
import { CarImagesParameters } from 'src/app/shared/models/shared-params.model';
import { SharedParamsService } from 'src/app/shared/services/shared-params.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent implements OnInit, OnDestroy {
  @Input() car!: Car;
  carCurrentImage!: string;
  carId!: string;
  isLoading: boolean = true;

  carImagesParams!: CarImagesParameters;
  private _carImagesParamsSubscription!: Subscription;
  
  constructor(
    private _sharedParams: SharedParamsService
  ) { }

  ngOnInit(): void {
    this._carImagesParamsSubscription = this._sharedParams.carImagesParamsSubject
    .subscribe((object) => {
      this.carImagesParams = object;
    })
  }

  ngOnDestroy(): void {
    this._carImagesParamsSubscription.unsubscribe();
  }

  afterImageIsLoaded() {
    this.isLoading = false;
  }

  onShowCarImages(carId: string) {
    this._sharedParams.showCarImages(carId);
  }
}
