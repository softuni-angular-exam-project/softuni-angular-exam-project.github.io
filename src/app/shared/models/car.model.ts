export class Car {
  constructor(
    public carImg: string,
    public carHoverImg: string,
    public carInfo: string,
    public carPrice: number,
    public dateCreation: firebase.default.firestore.Timestamp,
    public carImgs?: string [],
    public id?: string,
  ) {}
}

export class RouterLink {
  constructor(
    public name: string,
    public link: string,
    public date: firebase.default.firestore.Timestamp
  ){}
}

export class CarsForSell {
  constructor(
    public model: string,
    public year: number,
    public carImg: string,
    public description: string,
    public price: string,
    public owner: string,
    public date: firebase.default.firestore.Timestamp,
    public id?: string,
    public carImages?: any []
  ){}
}

export class CarManufactureYear {
  constructor(
    public year: number
  ){}	
}