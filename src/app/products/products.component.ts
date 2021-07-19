import { Component, OnInit } from '@angular/core';

import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { RouterLink } from '../shared/models/car.mode';

// TESTS
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  routerLinks!: RouterLink[];

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,

    // TESTS
    private _firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getRouterLinks().subscribe((data) => {
      this.routerLinks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as RouterLink
        }
      })      
      // error = ''
    }, (error) => {
      // error
    });
  }






























  // TESTS
  L0 = {
    carHoverImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2Flamborghini2.jpg?alt=media&token=90a7d43e-995d-4be2-b060-34e7db7905e8',
    carImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2Flamborghini1.jpg?alt=media&token=432365b2-fbc8-4156-933f-78d06caf5fac',
    carImgs: [
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-1.jpg?alt=media&token=3d10790d-f2a0-472f-94aa-ae9c3501b882',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-2.jpg?alt=media&token=13b78992-1615-454c-b305-c7dd6c511834',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-3.jpg?alt=media&token=1e00762a-82fd-41fe-a263-ca52e30eadb0',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-4.jpg?alt=media&token=13d4a81b-b267-4bae-9edf-47aaee39d114',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-5.jpg?alt=media&token=298d95e9-3184-4c67-a63a-7b0bc887b1d3',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-6.jpg?alt=media&token=ef2e3549-a7b2-40bc-92e6-f039f3ddeda5',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-7.jpg?alt=media&token=4cd14e0e-e5c4-4c3d-a253-80652de2a0a7',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-8.jpg?alt=media&token=412ea337-160c-4c6e-8b44-4507bfceddc6',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F0%2FcarImages%2Fimg-9.jpg?alt=media&token=aabe31ad-97a7-4ae8-a023-1a145babe9d1'
    ],
    carInfo: 'Lorem ipsum dolor, sit amet consectetur.',
    carPrice: 312000,
    dateCreation: firebase.default.firestore.Timestamp.now()
  };

  L1 = {
    carHoverImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2Flamborghini2.jpg?alt=media&token=04eb982d-c20a-469b-b3b7-c380db0a3fe6',
    carImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2Flamborghini1.jpg?alt=media&token=2fb5a467-c191-4ea9-8804-5133559e3036',
    carImgs: [
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-1.jpg?alt=media&token=d3004d47-8872-45fe-82d9-75ab9943ad9a',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-2.jpg?alt=media&token=624a3947-5cf0-4a79-b870-c9ae595d6872',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-3.jpg?alt=media&token=c33d8a93-9ea1-4b6a-b29e-e14528055097',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-4.jpg?alt=media&token=3811f697-0a13-417d-a48a-0e39cf0fa2de',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-5.jpg?alt=media&token=a2b5f201-c629-4269-86fc-090d1ae21461',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-6.jpg?alt=media&token=ba60915f-41e1-47d4-9a0a-48eb8d24be15',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-7.jpg?alt=media&token=1ba2b44e-61ac-4676-8875-5be0114f58fb',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-8.jpg?alt=media&token=3448399f-d1f9-4944-8de1-246e86b730a6',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Flamborghini%2F1%2FcarImages%2Fimg-9.jpg?alt=media&token=256940e0-f1d9-4225-b06c-68d1f37a9c0b'
    ],
    carInfo: 'Lorem ipsum dolor, sit amet consectetur.',
    carPrice: 299000,
    dateCreation: firebase.default.firestore.Timestamp.now()
  };

  P0 = {
    carHoverImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2Fporche1.jpg?alt=media&token=d605c3a1-37eb-4fba-8c4f-a2c749cdcb17',
    carImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2Fporche2.jpg?alt=media&token=da846820-2ab0-45c9-8d36-da59bdd6a0fc',
    carImgs: [
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2FcarImages%2Fimg-1.jpg?alt=media&token=a5df8622-ca8a-4f95-80dd-78b77e5ce786',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2FcarImages%2Fimg-2.jpg?alt=media&token=836e2601-215b-4cb3-a33c-6f2c2da6c568',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2FcarImages%2Fimg-3.jpg?alt=media&token=7130f188-627b-41be-8de8-2f63dacd0a08',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2FcarImages%2Fimg-4.jpg?alt=media&token=15953a71-6796-4b63-a049-cfbdb34045d8',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F0%2FcarImages%2Fimg-5.jpg?alt=media&token=37ceaa82-81c5-4376-93c7-0accb454a8cd'
    ],
    carInfo: 'Lorem ipsum dolor, sit amet consectetur.',
    carPrice: 195000,
    dateCreation: firebase.default.firestore.Timestamp.now()
  }

  P1 = {
    carHoverImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2Fporche1.jpg?alt=media&token=fffa5ed1-926d-40ec-b251-2e198b663439',
    carImg: 'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2Fporche2.jpg?alt=media&token=b7831235-64a1-4a7e-95fe-705f5ca4a281',
    carImgs: [
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2FcarImages%2Fimg-1.jpg?alt=media&token=89775896-8b91-4a22-8848-5c08f7050a83',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2FcarImages%2Fimg-2.jpg?alt=media&token=eb9fd136-2364-47e9-b17b-e04c7f618e4b',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2FcarImages%2Fimg-3.jpg?alt=media&token=71bf62a9-a4d8-444c-a349-506f51c3b658',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2FcarImages%2Fimg-4.jpg?alt=media&token=c4fd080c-9112-4db0-a5ff-57af095500af',
      'https://firebasestorage.googleapis.com/v0/b/softuni-angular-exam.appspot.com/o/productCategories%2Fporsche%2F1%2FcarImages%2Fimg-5.jpg?alt=media&token=13964744-96b2-41a6-ac84-eeb302bbe4d7'
    ],
    carInfo: 'Lorem ipsum dolor, sit amet consectetur.',
    carPrice: 135000,
    dateCreation: firebase.default.firestore.Timestamp.now()
  }

  set(param: any) {
    if(param == 'L0') {
      this._firestore.collection('lamborghiniCars').add(this.L0);    
    } else if (param == 'L1') {
      this._firestore.collection('lamborghiniCars').add(this.L1);  
    } else if (param == 'P0') {
      this._firestore.collection('porscheCars').add(this.P0);
    } else if (param == 'P1') {
      this._firestore.collection('porscheCars').add(this.P1);
    }
  }
}
