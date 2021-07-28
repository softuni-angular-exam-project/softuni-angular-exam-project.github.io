import { Component, OnInit } from '@angular/core';

import { CarsForSell } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-audi',
  templateUrl: './audi.component.html',
  styleUrls: ['./audi.component.scss']
})
export class AudiComponent implements OnInit {
  isLoading: boolean = true;
  audiCars!: CarsForSell[];
  errorMsg: string = '';

  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getSecondHandAudi().subscribe(data => {
      this.audiCars = data.map(e => {
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
