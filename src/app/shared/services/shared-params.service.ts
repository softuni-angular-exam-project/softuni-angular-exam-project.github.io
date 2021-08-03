import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CarImagesParameters, CommentParameters, NavParameters } from '../models/shared-params.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class SharedParamsService {
  initialNavParams = new NavParameters('out', 'out', 'out', false, false, window.innerWidth)
  navParamsSubject = new BehaviorSubject<NavParameters>(this.initialNavParams);

  initialCarImagesParams = new CarImagesParameters(false, null!);
  carImagesParamsSubject = new BehaviorSubject<CarImagesParameters>(this.initialCarImagesParams);

  initialCommentParams = new CommentParameters(false, null!);
  initialCommentParamsSubject = new BehaviorSubject<CommentParameters>(this.initialCommentParams);

  // Header navigation parameters
  swithcNavigationMenuState() {
    if (this.initialNavParams.userInfoMenuState == 'in') {
      this.initialNavParams.userInfoMenuState = 'out';
      this.initialNavParams.loginHistoryMenuState = 'out';
      this.initialNavParams.isOverlayShown = false;
    }

    this.initialNavParams.navigationMenuState == 'out' ?
      this.initialNavParams.navigationMenuState = 'in' :
      this.initialNavParams.navigationMenuState = 'out'

    if(this.initialCarImagesParams.carShowImages == true) {
      this.hideCarImages();
    };

    if (this.initialCommentParams.showUserInfo) {
      this.initialCommentParams.showUserInfo = false;
      this.initialCommentParams.shownUser = null!;
      this.initialNavParams.isOverlayShown = false;
    };
  }

  swithcUserInfoState() {
    if (this.initialNavParams.navigationMenuState == 'in') {
      this.initialNavParams.navigationMenuState = 'out';
    };

    if (this.initialCommentParams.showUserInfo) {
      this.initialCommentParams.showUserInfo = false;
      this.initialCommentParams.shownUser = null!;
    };

    this.initialNavParams.userInfoMenuState == 'out' ?
    [this.initialNavParams.userInfoMenuState = 'in', this.initialNavParams.isOverlayShown = true] :
    [this.initialNavParams.userInfoMenuState = 'out', this.initialNavParams.isOverlayShown = false, 
      this.initialNavParams.loginHistoryMenuState = 'out']

    if(this.initialCarImagesParams.carShowImages == true) {
      this.hideCarImages();
    }
  }

  showLoginHistory() {
    this.initialNavParams.loginHistoryMenuState = 'in';
  }

  hideLoginHistory() {
    this.initialNavParams.loginHistoryMenuState = 'out';
  }

  disableButton() {
    this.initialNavParams.disableButton = true;
  }

  enableButton() {
    this.initialNavParams.disableButton = false;
  }

  overlayClick() {
    if (this.initialNavParams.userInfoMenuState == 'in') {
      this.initialNavParams.userInfoMenuState = 'out';
      this.initialNavParams.loginHistoryMenuState = 'out';
    };

    if (this.initialCommentParams.showUserInfo) {
      this.initialCommentParams.showUserInfo = false;
      this.initialCommentParams.shownUser = null!;
    };

    this.initialNavParams.isOverlayShown = false;
  }

  resetParamsToDefault() {
    this.initialNavParams.userInfoMenuState = 'out';
    this.initialNavParams.loginHistoryMenuState = 'out';
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

  // Comments component parameters
  showUserInfo(shownUser: User) {
		this.initialCommentParams.showUserInfo = true;
		this.initialCommentParams.shownUser = shownUser;
		this.initialNavParams.isOverlayShown = true;
	}
}