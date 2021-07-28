import { Component, OnInit } from '@angular/core';

import { RouterLink } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-buy-car',
  templateUrl: './buy-car.component.html',
  styleUrls: ['./buy-car.component.scss']
})
export class BuyCarComponent implements OnInit {  
  getCarLinksErrorMsg: string = '';
  routerLinks!: RouterLink[];

  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getSecondHandCarsLink().subscribe(data => {
      this.routerLinks = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as RouterLink
        }
      })
      this.getCarLinksErrorMsg = '';
    }, error => {
      this.getCarLinksErrorMsg = error.message;
    });
  }
}
