import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/angular2';
import {GitAccount} from '../Models/GitAccount';
import {IGitAccountResponse} from '../Models/IGitAccountResponse';

@Injectable()
export class GitService {
    private baseUrl: string = 'https://api.github.com/users';

    constructor(private http: Http) {}

    getUsers = () => this.http.get(this.baseUrl)
                              .map<Response, GitAccount[]>(result => {
                                  const parsed = <IGitAccountResponse[]>result.json();
                                  return parsed.map(acc => new GitAccount(acc.login, acc.avatar_url, acc.html_url, acc.email));
                              });

    getUser = (login: string) => this.http.get(`${this.baseUrl}/${login}`)
                                          .map<Response, GitAccount>(result => {
                                              const parsed = <IGitAccountResponse>result.json();
                                              return new GitAccount(parsed.login, parsed.avatar_url, parsed.html_url, parsed.email)
                                          });
}