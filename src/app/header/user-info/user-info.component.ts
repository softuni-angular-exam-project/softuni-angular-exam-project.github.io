import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { PhoneCode } from 'src/app/shared/models/phone-code.model';
import { Animations } from '../../shared/animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavParameters } from 'src/app/shared/models/nav-params.model';
import { NavParamsService } from '../nav-params.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [Animations.slideLeftRight]
})
export class UserInfoComponent implements OnInit, OnDestroy {
  @Input() dbCollectionUser!: User;
  changePhoneButton: boolean = false;
  changePhoneForm!: FormGroup;
  phoneCodes!: PhoneCode[];
  errorMsgOnloadPhoneCodes!: string;
  errorMsgOnPhoneChange!: string;
  file: any;
  defaultImg!: string;
  imgLocalPath!: string;
  isInChangeImgMode: boolean = false;

  navParams!: NavParameters;
  private _navParamsSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _authService: AuthService,
    private _navParamsService: NavParamsService
  ) { }

  ngOnInit(): void {
    this.changePhoneForm = new FormGroup({
      phone: new FormControl(this.dbCollectionUser.phone, Validators.required),
      phoneCode: new FormControl(this.dbCollectionUser.phoneCode, Validators.required)  
    });

    this._firestoreCollections.getPhoneCodes().subscribe(data => {
      this.phoneCodes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as PhoneCode
        }        
      })
      this.errorMsgOnloadPhoneCodes = '';
    }, error => {
      this.errorMsgOnloadPhoneCodes = error.message;
    });

    this._navParamsSubscription = this._navParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    });

    this.defaultImg = this.imgLocalPath = this.dbCollectionUser.userImgUrl;
  }

  ngOnDestroy(): void {
    this._navParamsSubscription.unsubscribe();
  }

  onSwithcUserInfoState() {
    this._navParamsService.swithcUserInfoState();
  }

  onDisableButton() {
    this._navParamsService.disableButton();
	}

	onEnableButton() {
    this._navParamsService.enableButton();
  }

  uploadAvatar(event: any) {

  }

  uploadAvatarToFirestorage() {

  }

  changeImgMode() {

  }

  enablePhoneEdit() {
    this.changePhoneButton = true;
  }

  disablePhoneEdit() {
    this.changePhoneButton = false;
    this.changePhoneForm.get('phoneCode')!.setValue(this.dbCollectionUser.phoneCode);
    this.changePhoneForm.get('phone')!.setValue(this.dbCollectionUser.phone);
  }

  onChangePhone(changePhoneForm: FormGroup) {
    if (changePhoneForm.invalid) {
      return;
    }

    const userId = this.dbCollectionUser.uid;
    const phoneCode = changePhoneForm.value.phoneCode;
    const phone = changePhoneForm.value.phone;    
    const newPhoneInfo = {userId, phoneCode, phone}
    
    this._firestoreCollections.updatePhone(newPhoneInfo)
    .then(() => {
      this.changePhoneButton = false;
      this.errorMsgOnPhoneChange = '';
    }, (error) => {
      this.errorMsgOnPhoneChange = error.message;
    });
  }

  onLogout() {
    this._navParamsService.test();
    this._authService.logout();
  }
}
