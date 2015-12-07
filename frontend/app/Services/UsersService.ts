import {Injectable} from 'angular2/angular2';
import {Response} from 'angular2/http';
import {JwtHttp} from '../Services/JwtHttpService';
import {IUser} from '../Models/User';

@Injectable()
export class UsersService {
    constructor(private _http: JwtHttp) { }

    getUsers() {
        return this._http.get('http://localhost:1337/user').map<Response, IUser[]>(response => {
            const parsedJson = <any[]>response.json();

            return parsedJson.map(user => <IUser>{ id: user.id, login: user.login, createdAt: new Date(user.createdAt), updatedAt: new Date(user.updatedAt) });
        }).toPromise(Promise);
    }
}