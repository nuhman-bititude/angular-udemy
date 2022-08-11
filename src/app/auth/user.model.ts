export class userModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      //FIXME:
      return null;
      // return this._token;
    }
    return this._token;
  }
}
