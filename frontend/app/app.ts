import 'zone.js';
import 'reflect-metadata';
import {Component, View, bootstrap, provide, NgIf} from 'angular2/angular2';
import {HTTP_PROVIDERS, URLSearchParams} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {GitAccountComponent, GitAccountsComponent, LoginComponent, RegisterComponent, RegisteredUsersComponent} from './Components/Components';
import {AuthService, JWT_HTTP_PROVIDER} from './Services/Services';

@Component({
    bindings: [AuthService],
    selector: 'app',
})
@View({
    directives: [RouterOutlet, RouterLink, NgIf],
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
            <div class="row">
                <a *ng-if="!isAuthenticated" class="pull-right margin-std" [router-link]="['/Login']">Login</a>
                <div class="margin-std" *ng-if="isAuthenticated">
                    Hello, <b>{{ currentlyAuthenticatedUser.login }}</b>! (<a [router-link]="['/RegisteredUsers']">show all registered users</a>)
                    <a class="pull-right" [router-link]="['/Accounts']" (click)="logout($event)">Logout</a>
                </div>
            </div>
            <router-outlet />
        </div>
    `,
}) /* tslint:disable:object-literal-sort-keys */
@RouteConfig([
    { path: '/', component: GitAccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: GitAccountComponent, as: 'Account' },
    { path: '/registered-users', component: RegisteredUsersComponent, as: 'RegisteredUsers' },
    { path: '/register', component: RegisterComponent, as: 'Register' },
    { path: '/login', component: LoginComponent, as: 'Login' },
]) /* tslint:enable */
class AppComponent {
    private _authService: AuthService;

    constructor(authService: AuthService) {
        this._authService = authService;

        const searchParams = new URLSearchParams(window.location.search.substring(1));

        if (searchParams.has('code') && window.opener && window.opener.location.origin === window.location.origin) {
            const code = searchParams.get('code');

            window.opener.postMessage(code, window.location.origin);
        }
    }

    private logout(event: Event) {
        this._authService.logout();
        event.preventDefault();
    }

    private get isAuthenticated() { return AuthService.isAuthenticated; }
    private get currentlyAuthenticatedUser() { return AuthService.currentUserInfo; }
}

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    JWT_HTTP_PROVIDER,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
]);