import {Component, View} from 'angular2/angular2';
import {GitService} from '../Services/GitService';

@Component({
    selector: 'accounts',
    bindings: [GitService]
})
@View({
    template: '<div>Accounts</div>'
})
export class AccountsComponent {
    accounts: string;
    constructor(gitService: GitService) {
        gitService.getUsers()
                  .subscribe(accounts => this.accounts = accounts);
    }
}