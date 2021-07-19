import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { Animations } from '../shared/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.slideRightLeft]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _userSubscription!: Subscription;
  isAuth!: boolean;
  disableButton!: boolean;
  navigationMenuState: string = 'out';
	windowWidth!: number;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._userSubscription = this._authService.user.subscribe(user => {
      this.isAuth = !user ? false : true; 
    })
  }

  ngOnDestroy(): void {
    this._userSubscription.unsubscribe();
  }

  onLogout() {
    this._authService.logout();
  }

  swithcNavigationMenuState() {
		this.navigationMenuState == 'out' ? 
			this.navigationMenuState = 'in' :	
			this.navigationMenuState = 'out';
  }

  onDisableButton() {
    this.disableButton = true;
	}

	onEnableButton() {
    this.disableButton = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth >= 767) {      
      this.navigationMenuState = 'out';
    }
  }
}
