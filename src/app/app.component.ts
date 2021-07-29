import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { ThemeService } from './core/header/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Softuni Angular Exam Project';

  constructor(
    private _authservice: AuthService,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this._authservice.autoLogin();
    this._themeService.getCurrentTheme();
  }
}