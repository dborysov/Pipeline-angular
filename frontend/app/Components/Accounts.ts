import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {Account} from '../Models/Account';

@Component({
    selector: 'accounts',
    bindings: [GitService]
})
@View({
    directives: [CORE_DIRECTIVES, RouterLink],
    template: `
        <table class="table table-striped table-hover" *ng-if="accounts && accounts.length">
            <tr>
                <th class="col-md-2">Avatar</th>
                <th>Login</th>
            </tr>
            <tr *ng-for="#account of accounts" [router-link]="['/Account', {login: account.login}]">
                <td><img width="50" src="{{account.avatarUrl}}" alt="avatar"></td>
                <td>{{account.login}}</td>
            </tr>
        </table>
    `
})
export class AccountsComponent {
    private accounts: Account[] = [];
    constructor(gitService: GitService) {
        gitService.getUsers()
                  .subscribe(accounts => this.accounts = accounts);
    }
}