/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import 'angular2/bundles/angular2-polyfills.min';
import {Component, provide, enableProdMode} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {Router} from 'angular2/router';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, URLSearchParams} from 'angular2/http';
import {ROUTER_PROVIDERS, RouterLink, RouterOutlet, RouteConfig, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {GitAccountComponent, GitAccountsComponent, LoginComponent, RegisterComponent, RegisteredUsersComponent} from './Components/Components';
import {AuthService, JWT_HTTP_PROVIDER} from './Services/Services';

@Component({
    bindings: [AuthService],
    directives: [RouterOutlet, RouterLink, NgIf],
    selector: 'app',
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
                <a *ngIf="!isAuthenticated" class="pull-right margin-std" [routerLink]="['/Login']">Login</a>
                <div class="margin-std" *ngIf="isAuthenticated">
                    Hello, <b>{{ currentlyAuthenticatedUser.login }}</b>! (<a [routerLink]="['/RegisteredUsers']">show all registered users</a>)
                    <a href class="pull-right" (click)="logout($event)">Logout</a>
            </div>
            <router-outlet></router-outlet>
        </div>
    `,
})
/* tslint:disable:object-literal-sort-keys */
@RouteConfig([
    { path: '/', component: GitAccountsComponent, as: 'Accounts' },
    { path: '/account/:login', component: GitAccountComponent, as: 'Account' },
    { path: '/registered-users', component: RegisteredUsersComponent, as: 'RegisteredUsers' },
    { path: '/register', component: RegisterComponent, as: 'Register' },
    { path: '/login', component: LoginComponent, as: 'Login' },
]) /* tslint:enable */
class AppComponent {
    private _authService: AuthService;
    private _router: Router;

    constructor(authService: AuthService, router: Router) {
        this._authService = authService;
        this._router = router;

        const searchParams = new URLSearchParams(window.location.search.substring(1));

        if (searchParams.has('code') && window.opener && window.opener.location.origin === window.location.origin) {
            const code = searchParams.get('code');

            window.opener.postMessage(code, window.location.origin);
        }
    }

    private logout(event: Event) {
        this._authService.logout();
        this._router.navigateByUrl('/');
        event.preventDefault();
    }

    private get isAuthenticated() { return AuthService.isAuthenticated; }
    private get currentlyAuthenticatedUser() { return AuthService.currentUserInfo; }
}

enableProdMode();
bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    JWT_HTTP_PROVIDER,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
]);