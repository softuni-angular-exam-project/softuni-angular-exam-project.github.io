import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

import { LoginHistory, User } from '../models/user.model';
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

  updatePhone(newPhoneInfo: { userId: string, phoneCode: number, phone: number }){
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

  setUserIPAddress(userLoginInfo: LoginHistory) {
    return this._firestore
    .collection('users').doc(userLoginInfo.uid).update({
      loginHistory: firebase.default.firestore.FieldValue.arrayUnion({
        date: firebase.default.firestore.Timestamp.now(),
        ip: userLoginInfo.ip,
        id: userLoginInfo.id
      })
    })
  }

  deleteUserIPAddress(userID: string, lognHisoryObject: LoginHistory) {
    return this._firestore
    .collection('users').doc(userID)
    .update({
      loginHistory: firebase.default.firestore.FieldValue.arrayRemove(lognHisoryObject)
    })
  }

  updateUserImgUrl(newInfo: { userImgUrl: string, userId: string }){
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

  deleteSecondHandCurrentImage(doc: string, id: string, imgForDelete: string) {
    return this._firestore
    .collection(doc).doc(id)
    .update({
      carImages: firebase.default.firestore.FieldValue.arrayRemove(imgForDelete)
    });
  }

  updateSecondHandImagesCar(carImgUrl: { doc: string, id: string, img: string }){
    return this._firestore
    .collection(carImgUrl.doc).doc(carImgUrl.id)
    .update({
      carImages: firebase.default.firestore.FieldValue.arrayUnion(carImgUrl.img)
    });
  }

  updateSecondHandCar(newInfo: { carImg: string, description: string, price: number, id: string, doc: string }){
    return this._firestore
    .collection(newInfo.doc).doc(newInfo.id)
    .update({
      carImg: newInfo.carImg,
      description: newInfo.description,
      price: newInfo.price
    })
  }
}
