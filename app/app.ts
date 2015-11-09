import {FORM_DIRECTIVES, CORE_DIRECTIVES, Component, bootstrap, View, bind} from 'angular2/angular2';
import {ROUTER_PROVIDERS, RouterOutlet, RouteConfig} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';
import {AccountComponent} from './Components/Account';
import {AccountsComponent} from './Components/Accounts';

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

bootstrap(AppComponent, [HTTP_BINDINGS, ROUTER_PROVIDERS, bind(LocationStrategy).toClass(HashLocationStrategy)]);