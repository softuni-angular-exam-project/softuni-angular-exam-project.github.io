import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CarImagesParameters } from '../../models/shared-params.model';
import { SharedParamsService } from '../../services/shared-params.service';

@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.scss']
})
export class CarImagesComponent implements OnInit, OnDestroy {
  @Input() carImgs!: string[];

  carImagesParams!: CarImagesParameters;
  private _carImagesParamsSubscription!: Subscription;

  currentImgUrl!: string;
  currentImgIndex: number = 0;
  isLoading: boolean = false;

  constructor(
    private _sharedParams: SharedParamsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.currentImgUrl = this.carImgs[0];

    this._carImagesParamsSubscription = this._sharedParams.carImagesParamsSubject
    .subscribe((object) => {
      this.carImagesParams = object;
    })
  }

  ngOnDestroy(): void {
    this._carImagesParamsSubscription.unsubscribe();
  }

  onHideCarImages(){
    this._sharedParams.hideCarImages();    
  }

  changeImg(imageUrl: string, index: number) {
    this.currentImgUrl = imageUrl;
    this.currentImgIndex= index;
  }

  afterImageIsLoaded() {
    this.isLoading = false;
  }
}
