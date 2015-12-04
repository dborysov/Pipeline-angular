import {Injectable} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {UserAuth} from '../Models/UserAuth';

@Injectable()
export class AuthService {
    constructor(private http: Http) { }

    get isAuthenticated(): Boolean{
        return localStorage.getItem('id_token');
    }

    login(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this.http.post('http://localhost:1337/auth/login', JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => {
                    if (response.status !== 200) {
                        reject((<{message: string}>response.json()).message);
                    } else {
                        const parsedResp = <{ token: string, user: any }>response.json();

                        localStorage.setItem('id_token', parsedResp.token);

                        resolve(parsedResp.user);
                    }
                })
        });
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    register(user: UserAuth) {
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return new Promise((resolve, reject) => { //rxJs's toPromise just doesn't work correctly
            this.http.post('http://localhost:1337/auth/register', JSON.stringify(user), { headers })
                .toPromise(Promise)
                .then(response => {
                    if (response.status !== 200) {
                        reject((<{message: string}>response.json()).message);
                    } else {
                        const parsedResp = <{ token: string, user: any }>response.json();

                        localStorage.setItem('id_token', parsedResp.token);

                        resolve(parsedResp.user);
                    }
                })
        });
    }
}