import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {GitAccount} from '../Models/GitAccount';
import 'rxjs/add/operator/map';

@Injectable()
export class GitService {
    private _baseUrl = 'https://api.github.com/users';
    private _http: Http;

    constructor(http: Http) {
        this._http = http;
    }

    public getUsers() {
        return this._http.get(this._baseUrl)
                         .map<GitAccount[]>(result => {
                             const parsed = <IGitAccountResponse[]>result.json();
                             return parsed.map(acc => new GitAccount(acc.login, acc.avatar_url, acc.html_url, acc.email));
                         }).toPromise();
    }

    public getUser(login: string) {
        return this._http.get(`${this._baseUrl}/${login}`)
                         .map<GitAccount>(result => {
                             const parsed = <IGitAccountResponse>result.json();
                             return new GitAccount(parsed.login, parsed.avatar_url, parsed.html_url, parsed.email);
                         }).toPromise();
    }
}

interface IGitAccountResponse {
    login: string;
    avatar_url: string;
    html_url: string;
    email: string;
}
