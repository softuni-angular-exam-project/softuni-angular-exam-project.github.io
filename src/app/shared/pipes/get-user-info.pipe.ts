import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { FirestoreCollectionsService } from '../services/firestore-collections.service';

@Pipe({ name: 'getUserInfo' })
export class GetUserInfoPipe implements PipeTransform {

  constructor (
    private _firestoreCollections: FirestoreCollectionsService
  ) { }

  transform(value: string, exponent: string) {
    return this._firestoreCollections.getUserData(value)
    .pipe(map((ressData) => {
      const userData = ressData.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as User
        }
      })
      switch (exponent) {
        case 'name': return userData[0].name;
        case 'phoneCode': return userData[0].phoneCode;
        case 'phone': return userData[0].phone;
        case 'userImg': return 'url(' + userData[0].userImgUrl + ')';
      }
      return
    }))
  }
}