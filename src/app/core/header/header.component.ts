import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services/auth.service';
import { Animations } from '../../shared/animations';
import { User } from '../../shared/models/user.model';
import { SharedParamsService } from '../../shared/services/shared-params.service';
import { NavParameters } from '../../shared/models/shared-params.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.slideRightLeft]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth!: boolean;
  user!: User;

  navParams!: NavParameters;
  private _sharedParamsSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _sharedParamsService: SharedParamsService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user) => {
      this.user = user;
      this.isAuth = user ? true : false;
    });

    this._sharedParamsSubscription = this._sharedParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    });
  }

  ngOnDestroy(): void {
    this._sharedParamsSubscription.unsubscribe();
  }

  onSwithcNavigationMenuState() {
    if (this.navParams.windowWidth >= 767) {
      return
    }
		this._sharedParamsService.swithcNavigationMenuState();
  }

  onDisableButton() {
    this._sharedParamsService.disableButton();
	}

	onEnableButton() {
    this._sharedParamsService.enableButton();
  }

  onOverlayClick() {
    this._sharedParamsService.overlayClick();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navParams.windowWidth = event.target.innerWidth; 
  }
}