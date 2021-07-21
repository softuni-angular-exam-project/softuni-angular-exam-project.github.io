import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { Animations } from '../shared/animations';
import { User } from '../shared/models/user.model';
import { NavParamsService } from './nav-params.service';
import { NavParameters } from '../shared/models/nav-params.model';
import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [Animations.slideRightLeft]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _userSubscription!: Subscription;
  isAuth!: boolean;
  user!: User;
  dbCollectionUser!: User[];

  navParams!: NavParameters;
  private _navParamsSubscription!: Subscription;

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
    private _authService: AuthService,
    private _navParamsService: NavParamsService
  ) { }

  ngOnInit(): void {
    this._userSubscription = this._authService.user
    .subscribe((user) => {
      this.user = user;
      this.isAuth = !user ? false : true;

      const promise = new Promise<void>((resolve, reject) => {
        if (user) {
          resolve();
        }
      });

      promise.then(() => {
        this._firestoreCollections.getUserData(user.email).subscribe(data => {
          this.dbCollectionUser = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as User
            }  
          })
          // 
        }, (error) => {
          // 
        })
      })
    });

    this._navParamsSubscription = this._navParamsService.navParamsSubject
    .subscribe((params) => {
      this.navParams = params;
    })
  }

  ngOnDestroy(): void {
    this._navParamsSubscription.unsubscribe();
  }

  onSwithcNavigationMenuState() {
		this._navParamsService.swithcNavigationMenuState();
  }

  onDisableButton() {
    this._navParamsService.disableButton();
	}

	onEnableButton() {
    this._navParamsService.enableButton();
  }

  onOverlayClick() {
    this._navParamsService.overlayClick();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.navParams.windowWidth = event.target.innerWidth; 
  }
}
