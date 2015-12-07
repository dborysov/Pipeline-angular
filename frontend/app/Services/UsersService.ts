import {Injectable} from 'angular2/angular2';
import {JwtHttp} from '../Services/JwtHttpService';

@Injectable()
export class UsersService {
    constructor(private _http: JwtHttp) {}

    getUsers() {
        return this._http.get('http://localhost:1337/user').toPromise(Promise);
    }
}