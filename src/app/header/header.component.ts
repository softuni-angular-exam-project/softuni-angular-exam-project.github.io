import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { Animations } from '../shared/animations';
import { User } from '../shared/models/user.model';
import { NavParamsService } from './nav-params.service';
import { NavParameters } from '../shared/models/nav-params.model';

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
  private _navParamsSubscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _navParamsService: NavParamsService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user) => {
      this.user = user;
      this.isAuth = user ? true : false;
    });

    this._navParamsSubscription = this._navParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    })
  }

  ngOnDestroy(): void {
    this._navParamsSubscription.unsubscribe();
  }

  onSwithcNavigationMenuState() {
		this._navParamsService.swithcNavigationMenuState();
  }

  onDisableButton() {
    this._navParamsService.disableButton();
	}

	onEnableButton() {
    this._navParamsService.enableButton();
  }

  onOverlayClick() {
    this._navParamsService.overlayClick();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navParams.windowWidth = event.target.innerWidth; 
  }
}