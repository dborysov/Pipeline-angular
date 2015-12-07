export class GitAccount {
    public get login() { return this._login; }

    public get avatarUrl() { return this._avatarUrl; }

    public get gitUrl() { return this._gitUrl; }

    public get email() { return this._email; }

    constructor(private _login: string, private _avatarUrl: string, private _gitUrl: string, private _email: string) { }
}