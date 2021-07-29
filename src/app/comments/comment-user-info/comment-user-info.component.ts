import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/shared/models/user.model';
import { SharedParamsService } from 'src/app/shared/services/shared-params.service';

@Component({
  selector: 'app-comment-user-info',
  templateUrl: './comment-user-info.component.html',
  styleUrls: ['./comment-user-info.component.scss']
})
export class CommentUserInfoComponent implements OnInit {
  @Input() shownUser!: User;

  constructor(
    private _sharedParamsService: SharedParamsService
  ) { }

  ngOnInit(): void {
  }

  closeUserInfo() {
    this._sharedParamsService.overlayClick();
  }
}
