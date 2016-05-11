import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {JwtHttp} from '../Services/JwtHttpService';
import {IUser} from '../Models/User';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    private _baseUrl = 'http://localhost:1337';
    private _http: JwtHttp;

    constructor(http: JwtHttp) {
        this._http = http;
    }

    public getUsers() {
        return this._http.get(`${this._baseUrl}/user`).map<IUser[]>(response => {
            const parsedJson = <IUserResponse[]>response.json();

            return parsedJson.map(user => <IUser>{
                createdAt: new Date(user.createdAt),
                id: user.id,
                login: user.login,
                updatedAt: new Date(user.updatedAt),
            });
        }).toPromise();
    }
}

interface IUserResponse {
    createdAt: string;
    id: number;
    login: string;
    updatedAt: string;
}
