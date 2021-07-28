export class NavParameters {
  constructor(
    public userInfoMenuState: string,
    public navigationMenuState: string,
    public disableButton: boolean,
    public isOverlayShown: boolean,
    public windowWidth: number
  ){}
}

export class CarImagesParameters {
  constructor(
    public carShowImages: boolean,
    public carId: string
  ){}
}