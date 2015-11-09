import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Injector, Inject} from 'angular2/angular2';
import {Account} from '../Models/Account';

export class GitService {
    http: Http;
    constructor(@Inject(Http) http){
        this.http = http;
    }

    getUsers = () => this.http.get('https://api.github.com/users')
                              .map(result => result.json().map(acc => new Account(acc.login, acc.avatar_url, acc.html_url, acc.email)));

    getUser = login => this.http.get(`https://api.github.com/users/${login}`)
                                .map(result => {
                                    var parsed = result.json();
                                    return new Account(parsed.login, parsed.avatar_url, parsed.html_url, parsed.email)
                                });
}