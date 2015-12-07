export class GitAccount {
    private _login: string;
    public get login() : string {
        return this._login;
    }

    private _avatarUrl: string;
    public get avatarUrl() : string {
        return this._avatarUrl;
    }

    private _gitUrl: string;
    public get gitUrl() : string {
        return this._gitUrl;
    }

    private _email: string;
    public get email() : string {
        return this._email;
    }

    constructor(login: string, avatarUrl: string, gitUrl: string, email: string) {
        this._login = login;
        this._avatarUrl = avatarUrl;
        this._gitUrl = gitUrl;
        this._email = email;
    }
}