export class CurrentUser {
    private _login: string;
    get login() { return this._login; }

    constructor(login: string) {
        this._login = login;
     }
}