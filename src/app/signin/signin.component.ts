import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm!: FormGroup;

  errorAuthMsg!: string;
  private _errorAuthMsgSubscription!: Subscription;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('test_user@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    });

    this._errorAuthMsgSubscription =
    this._authService.errorAuthMsgSubject.subscribe((error) => {
      this.errorAuthMsg = error;
    });
  }

  ngOnDestroy(): void {
    this._errorAuthMsgSubscription.unsubscribe();
  }

  onSubmit(signinForm: FormGroup) {
    const email = signinForm.value.email;
    const password = signinForm.value.password;

    this._authService.signIn(email, password);
  }
}
