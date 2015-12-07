export class CurrentUserModel {
    get login() { return this._login; }

    constructor(private _login: string) { }
}