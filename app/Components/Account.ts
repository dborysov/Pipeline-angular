import {Component, View, NgIf} from 'angular2/angular2';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {GitService} from '../Services/GitService';

@Component({
    selector: 'account',
    bindings: [GitService]
})
@View({
    directives: [NgIf, ROUTER_DIRECTIVES],
    template: `
        <div *ng-if="account">
            <button class="btn btn-default" [router-link]="['/Accounts']">Back</button><br />
            <p class="margin-std">
                <img width="100" src="{{account.avatar_url}}" alt="avatar">
                <a href="{{account.html_url}}">{{account.login}}</a> ({{account.email}})
            </p>
        </div>
    `
})
export class AccountComponent {
    account: any;
    constructor(params: RouteParams, gitService: GitService) {
        gitService.getUser(params.get('login'))
                  .subscribe(account => this.account = account);

    }
}