import {Component, View, bootstrap, provide, NgIf} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AccountsComponent} from './Components/Accounts';
import {AccountComponent} from './Components/Account';
import {RegisterComponent} from './Components/Register';
import {LoginComponent} from './Components/Login';
import {AuthService} from './Services/AuthService';

@Component({
    selector: 'app',
    bindings: [AuthService]
})
@View({
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
            <div class="row">
                <a *ng-if="!isAuthenticated" class="pull-right margin-std" [router-link]="['/Login']">Login</a>
                <a *ng-if="isAuthenticated" class="pull-right margin-std" [router-link]="['/Accounts']" (click)="logout($event)">Logout</a>
            </div>
            <router-outlet/>
        </div>
    `,
    directives: [RouterOutlet, RouterLink, NgIf]
})
@RouteConfig([
    { path: '/', component: AccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: AccountComponent, as: 'Account' },
    { path: '/register', component: RegisterComponent, as: 'Register' },
    { path: '/login', component: LoginComponent, as: 'Login' },
])
class AppComponent {
    constructor(private authService: AuthService) { }

    logout(event: Event) {
        this.authService.logout();
        event.preventDefault();
    }

    get isAuthenticated(){return this.authService.isAuthenticated;}
}

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);