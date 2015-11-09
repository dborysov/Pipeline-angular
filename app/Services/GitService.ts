import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Inject} from 'angular2/angular2';
import {Account} from '../Models/Account';

export class GitService {
    private http: Http;
    private baseUrl: string = 'https://api.github.com/users';
    
    constructor(@Inject(Http) http : Http){
        this.http = http;
    }

    getUsers = () => this.http.get(this.baseUrl)
                              .map(result => result.json().map(acc => new Account(acc.login, acc.avatar_url, acc.html_url, acc.email)));

    getUser = (login : string) => this.http.get(`${this.baseUrl}/${login}`)
                                           .map(result => {
                                               var parsed = result.json();
                                               return new Account(parsed.login, parsed.avatar_url, parsed.html_url, parsed.email)
                                           });
}