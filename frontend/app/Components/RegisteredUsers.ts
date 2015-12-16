import {View, Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouterLink, CanActivate} from 'angular2/router';
import {GitService, UsersService, AuthService} from '../Services/Services';
import {IUser} from '../Models/User';

@Component({
    bindings: [UsersService],
    selector: 'account',
})
@View({
    directives: [NgFor, RouterLink],
    template: `
        <button class="btn btn-default" [routerLink]="['/Accounts']">Back</button><br />
        <table class="table table-striped table-hover">
            <tr>
                <th>Id</th>
                <th>Login</th>
                <th>Registration date</th>
                <th>Update date</th>
            </tr>
            <tr *ngFor="#user of _users">
                <td>{{user.id}}</td>
                <td>{{user.login}}</td>
                <td>{{user.createdAt | date}}</td>
                <td>{{user.updatedAt | date}}</td>
            </tr>
        </table>
    `,
})
@CanActivate(() => AuthService.isAuthenticated)
export class RegisteredUsersComponent {
    private _users: IUser[] = [];

    constructor(usersService: UsersService) {
        usersService.getUsers().then(users => { this._users = users; });
    }
}