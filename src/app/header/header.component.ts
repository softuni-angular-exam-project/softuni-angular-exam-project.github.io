import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private _userSubscription!: Subscription;
  isAuth: boolean = false;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._userSubscription = this._authService.user.subscribe(user => {
      this.isAuth = !user ? false : true; 
    })
  }

  onLogout() {
    this._authService.logout();
  }

}
