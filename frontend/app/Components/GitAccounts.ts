import {Component, View} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {GitAccount} from '../Models/GitAccount';

@Component({
    bindings: [GitService],
    selector: 'accounts',
})
@View({
    directives: [CORE_DIRECTIVES, RouterLink],
    template: `
        <table class="table table-striped table-hover" *ngIf="_accounts && _accounts.length">
            <tr>
                <th class="col-md-2">Avatar</th>
                <th>Login</th>
            </tr>
            <tr *ngFor="#account of _accounts" [routerLink]="['/Account', {login: account.login}]">
                <td><img width="50" src="{{account.avatarUrl}}" alt="avatar"></td>
                <td>{{account.login}}</td>
            </tr>
        </table>
    `,
})
export class GitAccountsComponent {
    private _accounts: GitAccount[] = [];

    constructor(gitService: GitService) {
        gitService.getUsers()
                  .subscribe(accounts => this._accounts = accounts);
    }
}