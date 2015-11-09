import {Component, View} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';
import {GitService} from '../Services/GitService';

@Component({
    selector: 'account',
    bindings: [GitService]
})
@View({
    template: '<div>Account: {{acc}}</div>'
})
export class AccountComponent {
    account: string;
    constructor(params: RouteParams, gitService: GitService) {
        gitService.getUser(params.get('login'))
                  .subscribe(account => this.account = account);

    }
}