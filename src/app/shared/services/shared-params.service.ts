import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarImagesParameters, NavParameters } from '../models/shared-params.model';

@Injectable({ providedIn: 'root' })
export class SharedParamsService {
  initialNavParams = new NavParameters('out', 'out', false, false, window.innerWidth)
  navParamsSubject = new BehaviorSubject<NavParameters>(this.initialNavParams);

  initialCarImagesParams = new CarImagesParameters(false, null!);
  carImagesPatamsSubject = new BehaviorSubject<CarImagesParameters>(this.initialCarImagesParams);

  // Header navigation parameters
  swithcNavigationMenuState() {
    if (this.initialNavParams.userInfoMenuState == 'in') {
      this.initialNavParams.userInfoMenuState = 'out';
      this.initialNavParams.isOverlayShown = false;
    }

    this.initialNavParams.navigationMenuState == 'out' ?
      this.initialNavParams.navigationMenuState = 'in' :
      this.initialNavParams.navigationMenuState = 'out'

    if(this.initialCarImagesParams.carShowImages == true) {
      this.hideCarImages();
    }
  }

  swithcUserInfoState() {
    if (this.initialNavParams.navigationMenuState == 'in') {
      this.initialNavParams.navigationMenuState = 'out';
    }

    this.initialNavParams.userInfoMenuState == 'out' ?
    [this.initialNavParams.userInfoMenuState = 'in', this.initialNavParams.isOverlayShown = true] :
    [this.initialNavParams.userInfoMenuState = 'out', this.initialNavParams.isOverlayShown = false]

    if(this.initialCarImagesParams.carShowImages == true) {
      this.hideCarImages();
    }
  }

  disableButton() {
    this.initialNavParams.disableButton = true;
  }

  enableButton() {
    this.initialNavParams.disableButton = false;
  }

  overlayClick() {
    this.initialNavParams.userInfoMenuState = 'out';
    this.initialNavParams.isOverlayShown = false;
  }

  resetParamsToDefault() {
    this.initialNavParams.userInfoMenuState = 'out';
    this.initialNavParams.navigationMenuState = 'out';
    this.initialNavParams.disableButton = false;
    this.initialNavParams.isOverlayShown = false;
    this.initialNavParams.windowWidth = window.innerWidth;
  }

  // Car images parameters
  showCarImages(carId: string) {
    this.initialCarImagesParams.carShowImages = true;
    this.initialCarImagesParams.carId = carId;
  }

  hideCarImages() {
    this.initialCarImagesParams.carShowImages = false;
  }
}