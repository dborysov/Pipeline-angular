import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Injector, Inject} from 'angular2/angular2';

export class GitService {
    http: Http;
    constructor(@Inject(Http) http){
        this.http = http;
    }

    getUsers = () => this.http.get('https://api.github.com/users')
                              .map(result => result.json());

    getUser = login => this.http.get(`https://api.github.com/users/${login}`)
                                .map(result => result.json());
}