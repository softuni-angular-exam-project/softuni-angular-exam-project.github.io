import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';

import { CarsForSell } from 'src/app/shared/models/car.model';
import { CarImagesParameters } from 'src/app/shared/models/shared-params.model';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreCollectionsService } from 'src/app/shared/services/firestore-collections.service';
import { SharedParamsService } from 'src/app/shared/services/shared-params.service';
import { GenerateIdService } from '../../shared/services/generate-id.service';

@Component({
  selector: 'app-buy-car-item',
  templateUrl: './buy-car-item.component.html',
  styleUrls: ['./buy-car-item.component.scss']
})
export class BuyCarItemComponent implements OnInit, OnDestroy {
  @Input() car!: CarsForSell;
  user!: User;

  carImagesParams!: CarImagesParameters;
  private _carImagesParamsSubscription!: Subscription;

  changeCarDetailsForm!: FormGroup;
  isInEditMode: boolean = false;
  carFile: any;
  carFiles: any = [];
  carImgLocalPath!: string;
  carImgNames: any = [];
  carImgLocalPaths: any = [];
  carImgURLs: any = [];
  currentCarImages: any = [];
  uploadCarImagesToFirestoreError: string = '';
  updateSecondHandCarError: string = '';
  setcarImgURLsError: string = '';
  isLoading: boolean = false;
  deleteOldImgError: string = '';
  getCarImgURLError: string = '';
  uploadCarImgToFirestoreError: string = '';
  currentImageForDelete: any = [];  

  constructor(
    private _authService: AuthService,
    private _sharedParams: SharedParamsService,
    private _formBuilder: FormBuilder,
    private _firestoreCollections: FirestoreCollectionsService,
    private _angularFireStorage: AngularFireStorage,
    private _generateIdService: GenerateIdService
  ) { }

  ngOnInit(): void {
    this._authService.user.subscribe((user) => {
      this.user = user;
    });

    this._carImagesParamsSubscription = this._sharedParams.carImagesParamsSubject
    .subscribe((object) => {
      this.carImagesParams = object;
    });

    this.changeCarDetailsForm = this._formBuilder.group({
      carImg:[null],
      model: [null],
      description: [null, Validators.required],      
      price: [null, Validators.required],
      carImgs: [null]
    });

    this.currentCarImages = [...this.car.carImages!];
    this.carImgLocalPath = this.car.carImg;
  }

  ngOnDestroy(): void {
    this._carImagesParamsSubscription.unsubscribe();
  }

  onShowCarImages(carId: string) {
    this._sharedParams.showCarImages(carId);
  }

  submitCarDetailChanges(changeCarDetailsForm: FormGroup) {
    if (!changeCarDetailsForm.valid) {
      return
    }

    this.isLoading = true;

    const id: string = this.car.id!;
    let carImg: string = this.car.carImg;
    const doc: string = this.car.model;

    this.uploadCarImageToFirestore(id!).then(() => {
      if (changeCarDetailsForm.value.carImg) {
        carImg = changeCarDetailsForm.value.carImg;
      }
      if (this.currentImageForDelete.length > 0) {
        for (let i = 0; i < this.currentImageForDelete.length; i++) {
          this._firestoreCollections.delete(this.currentImageForDelete[i])
        }
        const currentImgs: string = this.currentCarImages;
        const imgUrls = { doc, id, currentImgs }
        this._firestoreCollections.setSecondHandCurrentImages(imgUrls);        
      }
      this.uploadCarImagesToFirestore(id!).then(() => {
        if (this.carImgNames.length > 0) {
          for (let i = 0; i < this.carImgNames.length; i++) {
            const img: string = changeCarDetailsForm.value.carImgs[i];
            const carImgUrl = { doc, id, img }
            this._firestoreCollections.updateSecondHandImagesCar(carImgUrl)
          }
        }
        const description: string = changeCarDetailsForm.value.description;
        const price: number = changeCarDetailsForm.value.price;      
        const newInfo = { carImg, description, price, id, doc };
        this._firestoreCollections.updateSecondHandCar(newInfo)
        .then(() => {
          this.isLoading = false;
          this.updateSecondHandCarError = '';
          this.cancelChanges();
        }, (error) => {
          this.isLoading = false;
          this.updateSecondHandCarError = error.message;
        })
      })
    })
  }

  uploadCarImageToFirestore(id: string) {
    return new Promise<void>((resolve) => {
      if (!this.carFile) {
        resolve();
      }
      this._angularFireStorage.upload(
        "/carsForSell/" + 
        this.changeCarDetailsForm.value.model + '/' +
        this.user.email + '/' + 
        id + '/' + 
        this.carFile.name, this.carFile)
      .then(uploadTask => {
        uploadTask.ref.getDownloadURL()
        .then(url => {
          this.changeCarDetailsForm.value.carImg = url;          
          this._firestoreCollections.delete(this.car.carImg)
          .then(() => {
            this.deleteOldImgError = '';
          }, (error) => {
            this.deleteOldImgError = error.message;
          })
          this.getCarImgURLError = ''; 
        }, (error) => {
          this.getCarImgURLError = error.message; 
        })
        this.uploadCarImgToFirestoreError = '';
      }, (error) => {
        this.uploadCarImgToFirestoreError = error.message;
      })
    })
  }

  uploadCarImagesToFirestore(id: string) {
    return new Promise<void>((resolve) => {
      if(this.carImgNames.length == 0) {
        resolve();
      }
      for (let i = 0; i < this.carImgNames.length; i++) {
        this._angularFireStorage.upload(
          "/carsForSell/" +
          this.changeCarDetailsForm.value.model + '/' +
          this.user.email + '/' + 
          id + '/' +
          "/carImages/" +
          this._generateIdService.generateId() +
          "-" + this.carImgNames[i], this.carFiles[i])
        .then(uploadTask => {
          uploadTask.ref.getDownloadURL()
          .then(url => {
            this.carImgURLs.push(url);
            if (this.carImgURLs.length == this.carImgNames.length) {
              this.changeCarDetailsForm.value.carImgs = this.carImgURLs;
              this.setcarImgURLsError = '';
              resolve();
            }
          }, (error) => {
            this.setcarImgURLsError = error.message;
          })
          this.uploadCarImagesToFirestoreError = '';
        }, (error) => {
          this.uploadCarImagesToFirestoreError = error.message;
        })
      }      
    })
  }

  onChooseCarImg(event: any) {
    this.carFile = event.target.files[0];  
    if (this.carFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.carImgLocalPath = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.carImgLocalPath = this.car.carImg;
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

  edit() {
    this.changeCarDetailsForm.controls['description'].setValue(this.car.description);
    this.changeCarDetailsForm.controls['price'].setValue(this.car.price);
    this.changeCarDetailsForm.controls['model'].setValue(this.car.model);
    this.isInEditMode = true;    
  }

  removeCarImg(index: number) {
    this.carImgLocalPaths.splice(index, 1);
    this.carImgNames.splice(index, 1);
    this.carFiles.splice(index, 1);
    if(this.carFiles == 0) {
      this.changeCarDetailsForm.value.carImgs = null;
    }
  }

  deleteCurrentImages(index: number, url: string) {
    this.currentCarImages.splice(index, 1)
    this.currentImageForDelete.push(url)
  }

  cancelChanges() {
    this.carFiles = [];
    this.carImgLocalPaths = [];
    this.carImgNames = [];
    this.changeCarDetailsForm.controls['carImgs'].setValue('');
    this.changeCarDetailsForm.controls['carImg'].setValue('');
    this.carImgLocalPath = this.car.carImg;
    this.currentCarImages = [...this.car.carImages!];
    this.currentImageForDelete = [];  
    this.isInEditMode = false;    
  }
}
