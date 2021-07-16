export class Comment {
  constructor(
    public userName: string,
    public email: string,
    public date: firebase.default.firestore.Timestamp,
    public description: string,
    public id?: string,
    public replies?: Comment[],
    public commentId?: string
  ){}
}