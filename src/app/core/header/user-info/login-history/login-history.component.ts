import { Component, Input } from '@angular/core';

import { LoginHistory } from 'src/app/shared/models/user.model';
import { SharedParamsService } from 'src/app/shared/services/shared-params.service';

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent {
  @Input() loginHistory!: LoginHistory[];

  constructor(
    private _sharedParamsService: SharedParamsService
  ) {}

  onHideLoginHistory() {
    this._sharedParamsService.hideLoginHistory();
  }
}
