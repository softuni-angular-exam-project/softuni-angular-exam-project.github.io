export class User {
  constructor(
    public name: string,
    public email: string,
    public phoneCode: number,
    public phone: number,
    public userImgUrl: string,
    public uid?: string,
    public password?: string
  ) {}
}