import {Component, View, bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AccountsComponent} from './Components/Accounts';
import {AccountComponent} from './Components/Account';

@Component({
    selector: 'app'
})
@View({
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [RouterOutlet]
})
@RouteConfig([
    { path: '/', component: AccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: AccountComponent, as: 'Account' }
])
class AppComponent {}

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);