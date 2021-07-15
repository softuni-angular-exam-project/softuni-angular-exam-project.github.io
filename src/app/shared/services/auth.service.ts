import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../models/user.model';
import { FirestoreCollectionsService } from './firestore-collections.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null!);
  loadedUserPromise!: Promise<void>;
  errorAuthMsg!: string;
  errorAuthMsgSubject = new BehaviorSubject<string>('');

  constructor(
    private _router: Router,
    private _firebaseAuth: AngularFireAuth,
    private _firestoreCollections: FirestoreCollectionsService
  ) {}

  signUp(newUser: User) {
    this._firebaseAuth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(
        (user) => {
          newUser.uid = user.user!.uid;
          this._firestoreCollections.setUserData(newUser).then(
            () => {
              this.user.next(newUser);
              this._router.navigate(['/home']);
            },
            (error) => {
              //
            }
          );
          this.errorAuthMsg = '';
          this.errorAuthMsgSubject.next(this.errorAuthMsg);
        },
        (error) => {
          this.errorAuthHandler(error);
        }
      );
  }

  signIn(email: string, password: string) {
    this._firebaseAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.getUserData(email);
        this.loadedUserPromise.then(() => {
          this._router.navigate(['/home']);
          this.errorAuthMsg = '';
          this.errorAuthMsgSubject.next(this.errorAuthMsg);
        });
      },
      (error) => {
        this.errorAuthHandler(error);
      }
    );
  }

  logout() {
    this._firebaseAuth.signOut().then(() => {
      this.user.next(null!);
      this._router.navigate(['/login']);
    });
  }

  autoLogin() {
    this._firebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.getUserData(user.email!);
      } else {
        this.logout();
      }
    });
  }

  getUserData(userEmail: string) {
    this.loadedUserPromise = new Promise<void>((resolve, reject) => {
      this._firestoreCollections.getUserData(userEmail).subscribe(
        (data) => {
          const userInfo = data.map((e) => {
            return {
              id: e.payload.doc.id,
              ...(e.payload.doc.data() as User),
            };
          });
          const loadedUser = new User(
            userInfo[0].name,
            userInfo[0].email,
            userInfo[0].password,
            userInfo[0].phoneCode,
            userInfo[0].phone,
            userInfo[0].userImgUrl
          );
          this.user.next(loadedUser);          
          resolve();
        },
        (error) => {
          //
        }
      );
    });
  }

  errorAuthHandler(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use': {
        this.errorAuthMsg = 'Already has a registration with this email!';
        this.errorAuthMsgSubject.next(this.errorAuthMsg);
        break;
      }
      case 'auth/user-not-found': {
        this.errorAuthMsg = 'Wrong email or password!';
        this.errorAuthMsgSubject.next(this.errorAuthMsg);
        break;
      }
      case 'auth/wrong-password': {
        this.errorAuthMsg = 'Wrong email or password!';
        this.errorAuthMsgSubject.next(this.errorAuthMsg);
        break;
      }
      default: {
        this.errorAuthMsg = 'Unknown Error';
        this.errorAuthMsgSubject.next(this.errorAuthMsg);
        break;
      }
    }
  }
}
