import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _userSubscription!: Subscription;
  isAuth!: boolean;

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
}
