import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavParameters } from '../shared/models/nav-params.model';

@Injectable({ providedIn: 'root' })
export class NavParamsService {
  initialParams = new NavParameters('out', 'out', false, false, window.innerWidth)
  navParamsSubject = new BehaviorSubject<NavParameters>(this.initialParams);

  swithcNavigationMenuState() {
    if (this.initialParams.userInfoMenuState == 'in') {
      this.initialParams.userInfoMenuState = 'out';
      this.initialParams.isOverlayShown = false;
    }

    this.initialParams.navigationMenuState == 'out' ?
      this.initialParams.navigationMenuState = 'in' :
      this.initialParams.navigationMenuState = 'out'
  }

  swithcUserInfoState() {
    if (this.initialParams.navigationMenuState == 'in') {
      this.initialParams.navigationMenuState = 'out';
    }

    this.initialParams.userInfoMenuState == 'out' ?
    [this.initialParams.userInfoMenuState = 'in', this.initialParams.isOverlayShown = true] :
    [this.initialParams.userInfoMenuState = 'out', this.initialParams.isOverlayShown = false]
  }

  disableButton() {
    this.initialParams.disableButton = true;
  }

  enableButton() {
    this.initialParams.disableButton = false;
  }

  overlayClick() {
    this.initialParams.userInfoMenuState = 'out';
    this.initialParams.isOverlayShown = false;
  }

  resetParamsToDefault() {
    this.initialParams.userInfoMenuState = 'out';
    this.initialParams.navigationMenuState = 'out';
    this.initialParams.disableButton = false;
    this.initialParams.isOverlayShown = false;
    this.initialParams.windowWidth = window.innerWidth;
  }
}