import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { CarsForSell } from '../models/car.model';

@Injectable({ providedIn: 'root' })
export class FirestoreCollectionsService {
  userDefaultImgUrl: string = 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/userImages%2Fdefault-user.jpg?alt=media&token=00ab0080-7faa-4497-bbcc-4c0c9d7f0db2';

  constructor(
    private _firestore: AngularFirestore,
    private _storage: AngularFireStorage
  ) {}

  getPhoneCodes() {
    return this._firestore
      .collection('phoneCodes', (data) => data.orderBy('abbreviation', 'asc'))
      .snapshotChanges();
  }

  updatePhone(newPhoneInfo: any){
    return this._firestore
    .collection('users').doc(newPhoneInfo.userId).update({
      phoneCode: newPhoneInfo.phoneCode,
      phone: newPhoneInfo.phone
     });
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

  updateUserImgUrl(newInfo: any){
    return this._firestore.collection('users').doc(newInfo.userId)
    .update({
      userImgUrl: newInfo.userImgUrl
     });
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

  delete(url: string) {
    return this._storage.storage.refFromURL(url).delete();
  }

  getSecondHandCarsLink() {
    return this._firestore
    .collection('buyCarLinks', data => data.orderBy('date', 'asc'))
    .snapshotChanges();
  }

  getCarManufactureYears() {
    return this._firestore
    .collection('carManufactureYears', data => data.orderBy('year', 'desc'))
    .snapshotChanges();
  }

  setSecondHandCar(car: CarsForSell) {
    return this._firestore
    .collection(car.model).doc(car.id).set(car);
  }

  getSecondHandAudi() {
    return this._firestore
    .collection('Audi', data => data.orderBy('date', 'desc'))
    .snapshotChanges();
  }

  getSecondHandBMW() {
    return this._firestore
    .collection('BMW', data => data.orderBy('date', 'desc'))
    .snapshotChanges();
  }

  setSecondHanCurrentImages(url: any){
    return this._firestore
    .collection(url.doc).doc(url.id)
    .update({
      carImages: url.currentImgs
    });
  }

  updateSecondHanImagesCar(url: any){
    return this._firestore
    .collection(url.doc).doc(url.id)
    .update({
      carImages: firebase.default.firestore.FieldValue.arrayUnion(url.img)
    });
  }

  updateSecondHandCar(newInfo: any){
    return this._firestore
    .collection(newInfo.doc).doc(newInfo.id)
    .update({
      carImg: newInfo.carImg,
      description: newInfo.description,
      price: newInfo.price
     })
  }
}
