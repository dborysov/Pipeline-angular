import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {UserAuth} from '../Models/UserAuth';
import {CurrentUser} from '../Models/CurrentUser';

@Injectable()
export class AuthService {
    private static _tokenName = 'id_token';
    private _baseUrl = 'http://localhost:1337';

    private handleSuccessLogin(_response: Response, _resolve: (value?: any) => void, _reject: (value?: any) => void) {
        if (_response.status !== 200) {
            _reject((<{ message: string }>_response.json()).message);
        } else {
            const parsedResp = <{ token: string }>_response.json();

            localStorage.setItem(AuthService._tokenName, parsedResp.token);

            _resolve();
        }
    }

    constructor(private _http: Http) { }

    static get currentUserToken(): string {
        return localStorage.getItem(AuthService._tokenName);
    }

    static get isAuthenticated() {
        return !!AuthService.currentUserToken;
    }

    static get currentUserInfo() {
        const login = AuthService.decodeToken(AuthService.currentUserToken).login;

        return new CurrentUser(login);
    }

    login(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this._http.post(`${this._baseUrl}/auth/login`, JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => this.handleSuccessLogin(response, resolve, reject));
        });
    }

    register(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this._http.post(`${this._baseUrl}/auth/register`, JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => this.handleSuccessLogin(response, resolve, reject));
        });
    }

    logout() {
        localStorage.removeItem(AuthService._tokenName);
    }

    public static decodeToken(token: string) {
        var parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        var decoded = atob(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }
}