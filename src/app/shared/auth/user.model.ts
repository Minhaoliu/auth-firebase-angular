export class UserModel {
  constructor(
    public email: string,
    public displayName: string,
    private expiresIn: Date,
    private idToken: string,
  ) {}
}