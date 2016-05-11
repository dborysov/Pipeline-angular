export class GitAccount {
    private _login: string;
    public get login() { return this._login; }

    private _avatarUrl: string;
    public get avatarUrl() { return this._avatarUrl; }

    private _gitUrl: string;
    public get gitUrl() { return this._gitUrl; }

    private _email: string;
    public get email() { return this._email; }

    constructor(login: string, avatarUrl: string, gitUrl: string, email: string) {
        this._login = login;
        this._avatarUrl = avatarUrl;
        this._gitUrl = gitUrl;
        this._email = email;
    }
}
