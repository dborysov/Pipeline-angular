import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {GitService} from '../Services/GitService';
import {GitAccount} from '../Models/GitAccount';

@Component({
    bindings: [GitService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
    selector: 'accounts',
    template: `
        <table class="table table-striped table-hover" *ngIf="_accounts && _accounts.length">
            <tr>
                <th class="col-md-2">Avatar</th>
                <th>Login</th>
            </tr>
            <tr *ngFor="let account of _accounts">
                <td><img width="50" src="{{account.avatarUrl}}" alt="avatar"></td>
                <td><a [routerLink]="['/account', account.login]">{{account.login}}</a></td>
            </tr>
        </table>
    `,
})
export class GitAccountsComponent {
    private _accounts: GitAccount[] = [];

    constructor(gitService: GitService) {
        gitService.getUsers()
                  .then(accounts => this._accounts = accounts);
    }
}
