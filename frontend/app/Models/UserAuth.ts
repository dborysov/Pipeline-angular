export class UserAuth {
    private _login: string;
    public get login() { return this._login; }

    private _password: string;
    public get password() { return this._password; }

    constructor(login: string, password: string) {
        this._login = login;
        this._password = password;
    }
}
