import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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

  navParams!: NavParameters;
  private _navParamsSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _authService: AuthService,
    private _navParamsService: NavParamsService,
    private _angularFireStorage: AngularFireStorage,
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

    this._navParamsSubscription = this._navParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    });

    this.defaultImg = this.imgLocalPath = this.user.userImgUrl;
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
    if (this.user.userImgUrl !== this._firestoreCollections.userDefaultImgUrl) {
      this._firestoreCollections.delete(this.user.userImgUrl);
    }

    this._angularFireStorage
    .upload('/userImages/' + this.user.email + '/' + this.file.name, this.file)
    .then(uploadTask => {
      uploadTask.ref.getDownloadURL().then(url => {
        const userImgUrl = url;
        const userId = this.user.uid;
        const newIfo = { userImgUrl, userId };

        this._firestoreCollections.updateUserImgUrl(newIfo)
        .then(() => {
          this.isInChangeImgMode = false;
          this.errorMsgOnAvatarUpdate = '';
          this.defaultImg = url;
        }, (error) => {
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

    const userId = this.user.uid;
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
    this._navParamsService.resetParamsToDefault();

    //exit after the end of the animation
    setTimeout(() => {      
      this._authService.logout();
    }, Animations.animationSpeed);
  }
}