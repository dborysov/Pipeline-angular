import {View, Component, NgIf} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {UsersService} from '../Services/UsersService';

@Component({
    selector: 'account',
    bindings: [UsersService]
})
@View({
    directives: [NgIf, RouterLink],
    template: `
        <button class="btn btn-default" [router-link]="['/Accounts']">Back</button><br />
        {{users}}
    `
})
export class RegisteredUsersComponent {
    users: Object = {};
    constructor(private _usersService: UsersService) {
        this._usersService.getUsers().then(resp => { this.users = resp.json() })
    }
}