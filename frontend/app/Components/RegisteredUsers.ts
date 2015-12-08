import {View, Component, NgFor} from 'angular2/angular2';
import {RouterLink, CanActivate} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {UsersService} from '../Services/UsersService';
import {AuthService} from '../Services/AuthService';
import {IUser} from '../Models/User';

@Component({
    selector: 'account',
    bindings: [UsersService]
})
@View({
    directives: [NgFor, RouterLink],
    template: `
        <button class="btn btn-default" [router-link]="['/Accounts']">Back</button><br />
        <table class="table table-striped table-hover">
            <tr>
                <th>Id</th>
                <th>Login</th>
                <th>Registration date</th>
                <th>Update date</th>
            </tr>
            <tr *ng-for="#user of users">
                <td>{{user.id}}</td>
                <td>{{user.login}}</td>
                <td>{{user.createdAt | date}}</td>
                <td>{{user.updatedAt | date}}</td>
            </tr>
        </table>
    `
})
@CanActivate(() => AuthService.isAuthenticated)
export class RegisteredUsersComponent {
    users: IUser[] = [];
    constructor(private _usersService: UsersService) {
        this._usersService.getUsers().then(users => { this.users = users; })
    }
}