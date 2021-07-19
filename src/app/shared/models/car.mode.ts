export class Car {
  constructor(
    public carImg: string,
    public carHoverImg: string,
    public carInfo: string,
    public carPrice: number,
    public dateCreation: firebase.default.firestore.Timestamp,
    public carImgs?: any [],
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