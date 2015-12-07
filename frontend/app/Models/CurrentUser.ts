export class CurrentUser {
    get login() { return this._login; }

    constructor(private _login: string) { }
}