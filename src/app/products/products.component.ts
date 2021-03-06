import { Component, OnInit } from '@angular/core';

import { FirestoreCollectionsService } from '../shared/services/firestore-collections.service';
import { RouterLink } from '../shared/models/car.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  routerLinks!: RouterLink[];
  errorOnGetrouterLinks: string = '';

  constructor(
    private _firestoreCollections: FirestoreCollectionsService,
  ) { }

  ngOnInit(): void {
    this._firestoreCollections.getRouterLinks().subscribe((data) => {
      this.routerLinks = data.map((e) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as RouterLink
        }
      })      
      this.errorOnGetrouterLinks = ''
    }, (error) => {
      this.errorOnGetrouterLinks = error.message;
    });
  }
}
