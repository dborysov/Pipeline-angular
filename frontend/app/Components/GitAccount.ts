import {Component, View, NgIf} from 'angular2/angular2';
import {RouteParams, RouterLink} from 'angular2/router';
import {GitService} from '../Services/GitService';
import {GitAccount} from '../Models/GitAccount';

@Component({
    bindings: [GitService],
    selector: 'account',
})
@View({
    directives: [NgIf, RouterLink],
    template: `
        <div *ng-if="_account">
            <button class="btn btn-default" [router-link]="['/Accounts']">Back</button><br />
            <p class="margin-std">
                <img width="100" src="{{_account.avatarUrl}}" alt="avatar">
                <a href="{{_account.gitUrl}}">{{_account.login}}</a> ({{_account.email}})
            </p>
        </div>
    `,
})
export class GitAccountComponent {
    private _account: GitAccount;

    constructor(params: RouteParams, gitService: GitService) {
        gitService.getUser(params.get('login'))
                  .subscribe(account => this._account = account);

    }
}