import { Component, OnInit } from '@angular/core';

import { Car } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-lamborghini',
  templateUrl: './lamborghini.component.html',
  styleUrls: ['./lamborghini.component.scss']
})
export class LamborghiniComponent implements OnInit {
  lamborghiniCars!: Car[];
  errorOnGetLamborghiniCars: string = '';
  
  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getLamborghiniCars().subscribe((data) => {
      this.lamborghiniCars = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Car
        }
      })
      this.errorOnGetLamborghiniCars = '';
    }, (error) => {
      this.errorOnGetLamborghiniCars = error.message;
    });
  }
}
