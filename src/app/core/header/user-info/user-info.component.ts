import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { User } from 'src/app/shared/models/user.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { PhoneCode } from 'src/app/shared/models/phone-code.model';
import { Animations } from '../../../shared/animations';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavParameters } from 'src/app/shared/models/shared-params.model';
import { SharedParamsService } from '../../../shared/services/shared-params.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  animations: [Animations.slideLeftRight]
})
export class UserInfoComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  changePhoneButton: boolean = false;
  changePhoneForm!: FormGroup;
  phoneCodes!: PhoneCode[];
  errorMsgOnloadPhoneCodes: string = '';
  errorMsgOnPhoneChange: string = '';
  isInChangeImgMode: boolean = false;
  file: any;
  defaultImg!: string;
  imgLocalPath!: string;
  errorMsgOnAvatarUpload: string = '';
  errorMsgOnAvatarUpdate: string = '';
  darkMode!: boolean;
  isLoading: boolean = false;

  navParams!: NavParameters;
  private _sharedParamsSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _authService: AuthService,
    private _sharedParamsService: SharedParamsService,
    private _angularFireStorage: AngularFireStorage,
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.changePhoneForm = new FormGroup({
      phone: new FormControl(this.user.phone, Validators.required),
      phoneCode: new FormControl(this.user.phoneCode, Validators.required)  
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

    this._sharedParamsSubscription = this._sharedParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    });

    this.defaultImg = this.imgLocalPath = this.user.userImgUrl;

    this.darkMode = this._themeService.darkMode;
  }

  ngOnDestroy(): void {
    this._sharedParamsSubscription.unsubscribe();
  }

  onSwithcUserInfoState() {
    this._sharedParamsService.swithcUserInfoState();
  }

  onDisableButton() {
    this._sharedParamsService.disableButton();
	}

	onEnableButton() {
    this._sharedParamsService.enableButton();
  }

  changeImgMode() {
    this.isInChangeImgMode = !this.isInChangeImgMode;
    if (!this.isInChangeImgMode) {
      this.imgLocalPath = this.defaultImg;
      this.file = undefined;
    }
  }

  uploadAvatar(event: any) {
    this.file = event.target.files[0];  
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imgLocalPath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.imgLocalPath = this.defaultImg;
    } 
  }

  uploadAvatarToFirestorage() {
    this.isLoading = true;

    if (this.user.userImgUrl !== this._firestoreCollections.userDefaultImgUrl) {
      this._firestoreCollections.delete(this.user.userImgUrl);
    }

    this._angularFireStorage
    .upload('/userImages/' + this.user.email + '/' + this.file.name, this.file)
    .then(uploadTask => {
      uploadTask.ref.getDownloadURL().then(url => {
        const userImgUrl: string = url;
        const userId: string = this.user.uid!;
        const newIfo = { userImgUrl, userId };

        this._firestoreCollections.updateUserImgUrl(newIfo)
        .then(() => {
          this.isInChangeImgMode = false;
          this.isLoading = false;
          this.errorMsgOnAvatarUpdate = '';
          this.defaultImg = url;
        }, (error) => {
          this.isLoading = false;
          this.errorMsgOnAvatarUpdate = error.message;
        })
      })      
      this.errorMsgOnAvatarUpload = '';
      this.file = undefined;
    }, (error) => {
      this.errorMsgOnAvatarUpload = error.message;
    })
  }

  enablePhoneEdit() {
    this.changePhoneButton = true;
  }

  disablePhoneEdit() {
    this.changePhoneButton = false;
    this.changePhoneForm.get('phoneCode')!.setValue(this.user.phoneCode);
    this.changePhoneForm.get('phone')!.setValue(this.user.phone);
  }

  onChangePhone(changePhoneForm: FormGroup) {
    if (changePhoneForm.invalid) {
      return;
    }

    const userId: string = this.user.uid!;
    const phoneCode: number = changePhoneForm.value.phoneCode;
    const phone: number = changePhoneForm.value.phone;    
    const newPhoneInfo = {userId, phoneCode, phone}
    
    this._firestoreCollections.updatePhone(newPhoneInfo)
    .then(() => {
      this.changePhoneButton = false;
      this.errorMsgOnPhoneChange = '';
    }, (error) => {
      this.errorMsgOnPhoneChange = error.message;
    });
  }

  onShowLoginHistory() {
    this._sharedParamsService.showLoginHistory();
  }

  changeTheme() {
    JSON.parse(localStorage.getItem('theme')!) == 
      'theme-light' ? this._themeService.setDark() : this._themeService.setLight();
    this.darkMode = this._themeService.darkMode;
  }

  onLogout() {
    this._sharedParamsService.resetParamsToDefault();

    //exit after the end of the animation
    setTimeout(() => {      
      this._authService.logout();
    }, Animations.animationSpeed+100);
  }
}