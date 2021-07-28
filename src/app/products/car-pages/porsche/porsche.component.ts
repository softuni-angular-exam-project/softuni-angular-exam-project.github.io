import { Component, OnInit } from '@angular/core';

import { Car } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';

@Component({
  selector: 'app-porsche',
  templateUrl: './porsche.component.html',
  styleUrls: ['./porsche.component.scss']
})
export class PorscheComponent implements OnInit {
  porscheCars!: Car[];
  errorOnGetPorscheCars: string = '';

  constructor(
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getPorscheCars().subscribe((data) => {
      this.porscheCars = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Car
        }
      })
      this.errorOnGetPorscheCars = '';
    }, (error) => {
      this.errorOnGetPorscheCars = error.message;
    });
  }
}
