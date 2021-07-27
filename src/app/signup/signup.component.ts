import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { PhoneCode } from '../shared/models/phone-code.model';
import { AuthService } from '../shared/services/auth.service';
import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { User } from '../shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup;
  phoneCodes!: PhoneCode[];
  errorMsgOnLoadPhoneCodes!: string;

  errorAuthMsg!: string;
  private _errorAuthMsgSubscription!: Subscription;

  errorOnSetUserData!: string;
  private _errorOnSetUserDataSubscription!: Subscription;

  isLoading!: boolean;
  private _isLoadingSubscription!: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _firestoreCollections: FirestoreCollectionsService
  ) {}

  ngOnInit(): void {
    this.signupForm = this._formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        phoneCode: [359, Validators.required],
        phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
        confirmPass: [null, [Validators.required]],
      },
      {
        validator: this.confirmPasswordMatcher('password', 'confirmPass'),
      }
    );

    this._firestoreCollections.getPhoneCodes().subscribe(
      (data) => {
        this.phoneCodes = data.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as PhoneCode),
          };
        });
        this.errorMsgOnLoadPhoneCodes = '';
      },
      (error) => {
        this.errorMsgOnLoadPhoneCodes = error.message;
      }
    );

    this._errorAuthMsgSubscription =
      this._authService.errorAuthMsgSubject.subscribe((error) => {
        this.errorAuthMsg = error;
    });
    
    this._errorOnSetUserDataSubscription =
    this._authService.errorOnSetUserDataSubject.subscribe((error) => {
      this.errorOnSetUserData = error;
    });

    this._isLoadingSubscription = this._authService.isLoadingSubject
    .subscribe((boolean) => {
      this.isLoading = boolean;
    })
  }

  ngOnDestroy(): void {
    this._errorAuthMsgSubscription.unsubscribe();
    this._errorOnSetUserDataSubscription.unsubscribe();
    this._isLoadingSubscription.unsubscribe();

    this._authService.errorAuthMsg = '';
    this._authService.errorAuthMsgSubject.next(this._authService.errorAuthMsg);
  }

  confirmPasswordMatcher(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit(signupForm: FormGroup) {
    if (signupForm.invalid) {
      return;
    }

    const name = signupForm.value.name;
    const phoneCode = signupForm.value.phoneCode;
    const phone = signupForm.value.phone;
    const email = signupForm.value.email;
    const password = signupForm.value.password;
    const userImgUrl = this._firestoreCollections.userDefaultImgUrl;

    const newUser: User = {
      name,
      email,
      password,
      phoneCode,
      phone,
      userImgUrl,
    };

    this._authService.signUp(newUser);
  }
}
