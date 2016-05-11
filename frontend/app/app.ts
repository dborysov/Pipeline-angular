/// <reference path="../typings/browser.d.ts" />

import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/add/operator/toPromise';
import {Component, provide, enableProdMode} from '@angular/core';
import {NgIf, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS, URLSearchParams} from '@angular/http';
import {ROUTER_PROVIDERS, Router, Routes, ROUTER_DIRECTIVES} from '@angular/router';
import {GitAccountComponent, GitAccountsComponent, LoginComponent, RegisterComponent, RegisteredUsersComponent} from './Components/Components';
import {AuthService, JWT_HTTP_PROVIDER} from './Services/Services';

@Component({
    bindings: [AuthService],
    directives: [ROUTER_DIRECTIVES, NgIf],
    selector: 'app',
    template: `
        <div class="col-md-12">
            <h1 class="page-header text-center">Accounts</h1>
                <a *ngIf="!isAuthenticated" class="pull-right margin-std" [routerLink]="['/login']">Login</a>
                <div class="margin-std" *ngIf="isAuthenticated">
                    Hello, <b>{{ currentlyAuthenticatedUser.login }}</b>! (<a [routerLink]="['/registered-users']">show all registered users</a>)
                    <a href class="pull-right" (click)="logout($event)">Logout</a>
            </div>
            <router-outlet></router-outlet>
        </div>
    `,
})
/* tslint:disable:object-literal-sort-keys */
@Routes([
    { path: '/', component: GitAccountsComponent },
    { path: '/account/:login', component: GitAccountComponent },
    { path: '/registered-users', component: RegisteredUsersComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/login', component: LoginComponent },
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
