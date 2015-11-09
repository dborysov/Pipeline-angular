import {Component, View, NgIf, NgFor} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {GitService} from '../Services/GitService';

@Component({
    selector: 'accounts',
    bindings: [GitService]
})
@View({
    directives: [NgIf, NgFor, ROUTER_DIRECTIVES],
    template: `
        <table class="table table-striped table-hover" *ng-if="accounts && accounts.length">
            <thead>
                <tr>
                    <th class="col-md-2">Avatar</th>
                    <th>Login</th>
                </tr>
            </thead>
            <tbody>
                <tr *ng-for="#account of accounts" [router-link]="['/Account', {login: account.login}]">
                    <td><img width="50" src="{{account.avatar_url}}" alt="avatar"></td>
                    <td>{{account.login}}</td>
                </tr>
            </tbody>
        </table>
    `
})
export class AccountsComponent {
    accounts: any = [];
    constructor(gitService: GitService) {
        gitService.getUsers()
                  .subscribe(accounts => this.accounts = accounts);
    }
}