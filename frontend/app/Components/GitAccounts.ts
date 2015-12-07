import {Component, View, CORE_DIRECTIVES} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {GitAccount} from '../Models/GitAccount';

@Component({
    selector: 'accounts',
    bindings: [GitService]
})
@View({
    directives: [CORE_DIRECTIVES, RouterLink],
    template: `
        <table class="table table-striped table-hover" *ng-if="_accounts && _accounts.length">
            <tr>
                <th class="col-md-2">Avatar</th>
                <th>Login</th>
            </tr>
            <tr *ng-for="#account of _accounts" [router-link]="['/Account', {login: account.login}]">
                <td><img width="50" src="{{account.avatarUrl}}" alt="avatar"></td>
                <td>{{account.login}}</td>
            </tr>
        </table>
    `
})
export class GitAccountsComponent {
    private _accounts: GitAccount[] = [];
    constructor(gitService: GitService) {
        gitService.getUsers()
                  .subscribe(accounts => this._accounts = accounts);
    }
}