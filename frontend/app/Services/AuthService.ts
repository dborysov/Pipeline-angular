import {Injectable} from 'angular2/core';
import {Http, Headers, Response} from 'angular2/http';
import {UserAuth} from '../Models/UserAuth';
import {CurrentUser} from '../Models/CurrentUser';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private static _tokenName = 'id_token';
    private _baseUrl = 'http://localhost:1337';
    private _http: Http;

    constructor(http: Http) {
        this._http = http;
    }

    public static get currentUserToken(): string {
        return localStorage.getItem(AuthService._tokenName);
    }

    public static get isAuthenticated() {
        return !!AuthService.currentUserToken;
    }

    public static get currentUserInfo() {
        const login = AuthService.decodeToken(AuthService.currentUserToken).login;

        return new CurrentUser(login);
    }

    private static decodeToken(token: string) {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        const decoded = atob(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }

    public login(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requetParameters = {login: user.login, password: user.password};

        return this._http.post(`${this._baseUrl}/auth/login`, JSON.stringify(requetParameters), { headers })
            .toPromise(Promise)
            .then(response => this.handleSuccessLogin(response));
    }

    public authGoogle(params: { code: string, clientId: string }) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestParameters = { clientId: params.clientId, code: params.code, redirectUri: window.location.origin };

        return this._http.post(`${this._baseUrl}/auth/google`, JSON.stringify(requestParameters), { headers })
            .toPromise(Promise)
            .then(response => this.handleSuccessLogin(response));
    }

    public register(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requetParameters = {login: user.login, password: user.password};

        return this._http.post(`${this._baseUrl}/auth/register`, JSON.stringify(requetParameters), { headers })
            .toPromise(Promise)
            .then(response => this.handleSuccessLogin(response));
    }

    public logout() {
        localStorage.removeItem(AuthService._tokenName);
    }

    private handleSuccessLogin(response: Response) {
        return new Promise((resolve, reject) => {
            if (response.status !== 200) {
                reject(response.json()['message']);
            } else {
                const parsedResp = <{ token: string }>response.json();

                localStorage.setItem(AuthService._tokenName, parsedResp.token);

                resolve();
            }
        });
    }
}