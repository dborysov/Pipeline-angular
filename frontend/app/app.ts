import {Component, View, bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AccountsComponent} from './Components/Accounts';
import {AccountComponent} from './Components/Account';
import {RegisterComponent} from './Components/Register';
import {LoginComponent} from './Components/Login';
import {LogoutComponent} from './Components/Logout';

@Component({
    selector: 'app'
})
@View({
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
            <a class="pull-right" [router-link]="['/Login']">Login</a>&nbsp;
            <a class="pull-right" [router-link]="['/Logout']">Logout</a>&nbsp;
            <a class="pull-right" [router-link]="['/Register']">Register</a>
            <router-outlet/>
        </div>
    `,
    directives: [RouterOutlet, RouterLink]
})
@RouteConfig([
    { path: '/', component: AccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: AccountComponent, as: 'Account' },
    { path: '/register', component: RegisterComponent, as: 'Register'},
    { path: '/login', component: LoginComponent, as: 'Login'},
    { path: '/logout', component: LogoutComponent, as: 'Logout'}
])
class AppComponent {}

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})]);