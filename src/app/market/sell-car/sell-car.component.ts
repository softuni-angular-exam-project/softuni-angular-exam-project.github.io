import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { CarManufactureYear, RouterLink } from 'src/app/shared/models/car.model';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { GenerateIdService } from '../generate-id.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-sell-car',
  templateUrl: './sell-car.component.html',
  styleUrls: ['./sell-car.component.scss']
})
export class SellCarComponent implements OnInit {
  sellCarForm!: FormGroup;
  carModels: RouterLink[] = [];
  getCarModelsError: string = '';
  carManufactureYears: CarManufactureYear[] = [];
  getCarManufactureYearError: string = '';
  isLoading: boolean = false;
  user!: User;
  carFile!: any;
  getCarImgURLError: string = '';
  uploadCarImgToFirestoreError: string = '';
  carImgLocalPaths: any = [];
  carImgNames: any = [];
  carImgURLs: any = [];
  carFiles: any = [];
  getcarImgURLsError: string = '';
  uploadCarImagesToFirestoreError: string = '';
  carDefaultImg: string = '../../../assets/images/market/upload-img.png';
  carImgLocalPath: string = this.carDefaultImg;
  sellCarError: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _firestoreCollections: FirestoreCollectionsService,
    private _generateIdService: GenerateIdService,
    private _angularFireStorage: AngularFireStorage,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.sellCarForm = this._formBuilder.group({
      model: [null, Validators.required],
      year: [null, Validators.required],
      carImg: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      carImgs: [null]
    });

    this._authService.user.subscribe((user) => {
      this.user = user; 
    })

    this._firestoreCollections.getSecondHandCarsLink().subscribe(data => {
      this.carModels = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as RouterLink
        }
      })
      this.getCarModelsError = '';
    }, error => {
      this.getCarModelsError = error.message;
    });

    this._firestoreCollections.getCarManufactureYears().subscribe(data => {
      this.carManufactureYears = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as CarManufactureYear
        }
      })
      this.getCarManufactureYearError = '';      
    }, error => {
      this.getCarManufactureYearError = error.message;     
    });
  }

  onSubmit(sellCarForm: FormGroup) {
    if (sellCarForm.invalid) {
      return
    }

    this.isLoading = true;

    const id = this._generateIdService.generateId();

    this.uploadCarImgToFirestore(id).then(() => {
      this.uploadCarImagesToFirestore(id).then(() => {
        const model = sellCarForm.value.model;
        const year = sellCarForm.value.year;
        const carImg = sellCarForm.value.carImg;
        const description = sellCarForm.value.description.trim();
        const price = sellCarForm.value.price;
        const owner = this.user.email;
        const date = firebase.default.firestore.Timestamp.now();
        const carImages = sellCarForm.value.carImgs;
        const car = { model, year, carImg, description, price, owner, id, date, carImages };
        this._firestoreCollections.setSecondHandCar(car)
        .then(() => {
          this.isLoading = false;
          this.sellCarForm.reset();
          this._router.navigate(['/market/buy/' + model.toLowerCase()]);
          this.carImgNames = [];
          this.carImgLocalPaths = [];
          this.carImgURLs = [];
          this.carImgLocalPath = this.carDefaultImg;
          this.sellCarError = '';
        })
        .catch(error => {
          this.sellCarError = error.message;
        });
      })
    })
  };

  uploadCarImgToFirestore(id: string) {
    return new Promise<void>((resolve, reject) => {
      this._angularFireStorage.upload(
        "/carsForSell/" + 
        this.sellCarForm.value.model + '/' +
        this.user.email + '/' + 
        id + '/' + 
        this.carFile.name, this.carFile)
      .then((uploadTask) => {
        uploadTask.ref.getDownloadURL()
        .then(url => {
          this.sellCarForm.value.carImg = url;
          this.getCarImgURLError = '';          
          resolve();
        }, (error) => {
          this.getCarImgURLError = error.message;
        })
        this.uploadCarImgToFirestoreError = '';
      }, (error) => {
        this.uploadCarImgToFirestoreError = error.message;
      })
    })
  };

  onChooseCarImg(event: any) {
    this.carFile = event.target.files[0];
    if (this.carFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.carImgLocalPath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.carImgLocalPath = this.carDefaultImg;
    }     
  }

  onChooseCarImgs(event: any) {
    for (let i = 0; i < event.target.files.length; i++){
      this.carFiles.push(event.target.files[i]);
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.carImgLocalPaths.push(event.target.result);
      }
      reader.readAsDataURL(event.target.files[i]);
      this.carImgNames.push(this.carFiles[i].name);
    } 
  }

  uploadCarImagesToFirestore(id: string) {
    return new Promise<void>((resolve, reject) => {
      if(this.carImgNames.length == 0) {
        this.sellCarForm.value.carImgs = this.carImgURLs;
        resolve();
      }

      for (let i = 0; i < this.carImgNames.length; i++) {
        this._angularFireStorage.upload(
          "/carsForSell/" +
          this.sellCarForm.value.model + '/' +
          this.user.email + '/' + 
          id + '/' +
          "/carImages/" +
          // to avoid unexpected replace
          this._generateIdService.generateId() +
          "-" + this.carImgNames[i], this.carFiles[i]
        ).then((uploadTask) => {
          uploadTask.ref.getDownloadURL()
          .then(url => {
            this.carImgURLs.push(url);            
            if (this.carImgURLs.length == this.carImgNames.length) {
              this.sellCarForm.value.carImgs = this.carImgURLs;
              this.getcarImgURLsError = '';
              resolve();
            }
          }, (error) => {
            this.getcarImgURLsError = error.message;
          })
          this.uploadCarImagesToFirestoreError = '';
        }, (error) => {
          this.uploadCarImagesToFirestoreError = error.message;
        })
      }
    })
  };

  removeCarImg(index: number) {
    this.carImgLocalPaths.splice(index, 1);
    this.carImgNames.splice(index, 1);
    this.carFiles.splice(index, 1);
    if(this.carFiles == 0) {
      this.sellCarForm.value.carImgs = null;
    }
  };
}
