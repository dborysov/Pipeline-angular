import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/angular2';
import {Account} from '../Models/Account';
import {IAccountResponse} from '../Models/IAccountResponse';

@Injectable()
export class GitService {
    private baseUrl: string = 'https://api.github.com/users';

    constructor(private http: Http) {}

    getUsers = () => this.http.get(this.baseUrl)
                              .map<Response, Account[]>(result => {
                                  const parsed = <IAccountResponse[]>result.json();
                                  return parsed.map(acc => new Account(acc.login, acc.avatar_url, acc.html_url, acc.email));
                              });

    getUser = (login: string) => this.http.get(`${this.baseUrl}/${login}`)
                                          .map<Response, Account>(result => {
                                              const parsed = <IAccountResponse>result.json();
                                              return new Account(parsed.login, parsed.avatar_url, parsed.html_url, parsed.email)
                                          });
}