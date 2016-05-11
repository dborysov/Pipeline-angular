import {Component} from '@angular/core';
import {NgFor} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {GitService, UsersService, AuthService} from '../Services/Services';
import {IUser} from '../Models/User';

@Component({
    bindings: [UsersService],
    directives: [NgFor, ROUTER_DIRECTIVES],
    selector: 'account',
    template: `
        <a class="btn btn-default" [routerLink]="['/']">Back</a><br />
        <table class="table table-striped table-hover">
            <tr>
                <th>Id</th>
                <th>Login</th>
                <th>Registration date</th>
                <th>Update date</th>
            </tr>
            <tr *ngFor="let user of _users">
                <td>{{user.id}}</td>
                <td>{{user.login}}</td>
                <td>{{user.createdAt | date}}</td>
                <td>{{user.updatedAt | date}}</td>
            </tr>
        </table>
    `,
})
// @CanActivate(() => AuthService.isAuthenticated)
export class RegisteredUsersComponent {
    private _users: IUser[] = [];

    constructor(usersService: UsersService) {
        usersService.getUsers().then(users => { this._users = users; });
    }
}
