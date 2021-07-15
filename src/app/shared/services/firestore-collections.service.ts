import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class FirestoreCollectionsService {
  constructor(private _firestore: AngularFirestore) {}

  getPhoneCodes() {
    return this._firestore
      .collection('phoneCodes', (data) => data.orderBy('abbreviation', 'asc'))
      .snapshotChanges();
  }

  setUserData(newUser: User) {
    return this._firestore.collection('users').doc(newUser.uid).set({
      name: newUser.name,
      email: newUser.email,
      phoneCode: newUser.phoneCode,
      phone: newUser.phone,
      userImgUrl: newUser.userImgUrl,
      uid: newUser.uid
    });
  }

  getUserData(userEmail: string) {
    return this._firestore
      .collection('users', (data) => data.where('email', '==', userEmail))
      .snapshotChanges();
  }
}
