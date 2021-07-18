export class Comment {
  constructor(
    public userName: string,
    public email: string,
    public date: firebase.default.firestore.Timestamp,
    public description: string,
    public id?: string,
    public commentId?: string,
    public replies?: Comment[]
  ){}
}