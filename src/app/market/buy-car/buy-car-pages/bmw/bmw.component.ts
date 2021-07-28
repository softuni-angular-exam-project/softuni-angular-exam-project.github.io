import { Component, OnInit } from '@angular/core';

import { CarsForSell } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-bmw',
  templateUrl: './bmw.component.html',
  styleUrls: ['./bmw.component.scss']
})
export class BmwComponent implements OnInit {
  isLoading: boolean = true;
  bmwCars!: CarsForSell[];
  errorMsg: string = '';
  
  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getSecondHandBMW().subscribe(data => {
      this.bmwCars = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as CarsForSell
        }
      })
      this.isLoading = false;
      this.errorMsg = '';       
    }, (error) => {
      this.isLoading = false;
      this.errorMsg = error.message;
    });
  }
}
