import {Component, View, bootstrap, provide, NgIf} from 'angular2/angular2';
import {HTTP_PROVIDERS, XHRBackend, RequestOptions} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {GitAccountsComponent} from './Components/GitAccounts';
import {GitAccountComponent} from './Components/GitAccount';
import {RegisteredUsersComponent} from './Components/RegisteredUsers';
import {RegisterComponent} from './Components/Register';
import {LoginComponent} from './Components/Login';
import {AuthService} from './Services/AuthService';
import {JwtHttp} from './Services/JwtHttpService';
import {CurrentUserModel} from './Models/CurrentUserModel';

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
                <div class="margin-std" *ng-if="isAuthenticated">Hello, <b>{{currentlyAuthenticatedUser.login}}</b>! (<a [router-link]="['/RegisteredUsers']">show all registered users</a>)<a class="pull-right" [router-link]="['/Accounts']" (click)="logout($event)">Logout</a></div>
            </div>
            <router-outlet />
        </div>
    `,
    directives: [RouterOutlet, RouterLink, NgIf]
})
@RouteConfig([
    { path: '/', component: GitAccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: GitAccountComponent, as: 'Account' },
    { path: '/registered-users', component: RegisteredUsersComponent, as: 'RegisteredUsers' },
    { path: '/register', component: RegisterComponent, as: 'Register' },
    { path: '/login', component: LoginComponent, as: 'Login' },
])
class AppComponent {
    constructor(private authService: AuthService) { }

    logout(event: Event) {
        this.authService.logout();
        event.preventDefault();
    }

    get isAuthenticated() { return AuthService.isAuthenticated; }
    get currentlyAuthenticatedUser() { return AuthService.currentUserInfo; }
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(JwtHttp,
        {
            useFactory: (xhrBackend, requestOptions) => new JwtHttp(xhrBackend, requestOptions),
            deps: [XHRBackend, RequestOptions]
        })
]);