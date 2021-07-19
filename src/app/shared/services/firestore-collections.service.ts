import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';

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

  setComment(comment: Comment) {
    return this._firestore.collection('comments').add(comment);
  }

  getComments() {
    return this._firestore
      .collection('comments', (data) => data.orderBy('date', 'asc'))
      .snapshotChanges();
  }

  setReply(reply: Comment){
    return this._firestore.collection('comments').doc(reply.commentId)    
      .update({
        replies: firebase.default.firestore.FieldValue.arrayUnion({
          userName: reply.userName,
          email: reply.email,
          date: reply.date,
          description: reply.description
        })
      });
  }

  getLamborghiniCars() {
    return this._firestore
    .collection('lamborghiniCars', data => data.orderBy('dateCreation', 'desc'))
    .snapshotChanges();
  }

  getPorscheCars() {
    return this._firestore
    .collection('porscheCars', data => data.orderBy('dateCreation', 'desc'))
    .snapshotChanges();
  }

  getRouterLinks() {
    return this._firestore
    .collection('routerLinks', data => data.orderBy('date', 'asc'))
    .snapshotChanges();
  }
}
