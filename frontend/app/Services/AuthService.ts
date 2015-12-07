import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {UserAuth} from '../Models/UserAuth';
import {CurrentUser} from '../Models/CurrentUser';

@Injectable()
export class AuthService {
    private handleSuccessLogin(response: Response, resolve: (value: any) => void, reject: (value: any) => void) {
        if (response.status !== 200) {
            reject((<{ message: string }>response.json()).message);
        } else {
            const parsedResp = <{ token: string, user: any }>response.json();

            localStorage.setItem('id_token', parsedResp.token);

            resolve(parsedResp.user);
        }
    }

    constructor(private http: Http) { }

    static get currentUserToken(): string {
        return localStorage.getItem('id_token');
    }

    static get isAuthenticated(): Boolean {
        return !!AuthService.currentUserToken;
    }

    static get currentUserInfo(): CurrentUser {
        const login = AuthService.decodeToken(AuthService.currentUserToken).login;

        return new CurrentUser(login);
    }

    login(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this.http.post('http://localhost:1337/auth/login', JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => this.handleSuccessLogin(response, resolve, reject));
        });
    }

    register(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this.http.post('http://localhost:1337/auth/register', JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => this.handleSuccessLogin(response, resolve, reject));
        });
    }

    logout() {
        localStorage.removeItem('id_token');
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