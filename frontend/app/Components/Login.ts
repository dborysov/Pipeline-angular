import {Component} from '@angular/core';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import {ROUTER_DIRECTIVES, CanDeactivate, Router} from '@angular/router';
import {AuthService} from '../Services/AuthService';
import {UserAuth} from '../Models/UserAuth';

@Component({
    bindings: [AuthService, FormBuilder],
    directives: [ROUTER_DIRECTIVES],
    template: `
        <form [ngFormModel]="_loginForm" (submit)="login($event)">
            <input ngControl="login" type="text" placeholder="Login">
            <input ngControl="password" type="password" placeholder="Password">
            <button class="btn btn-success-line" type="submit">Login</button>
            <div>{{ _errorMessage }}</div>
            <a [routerLink]="['/register']">Register</a>
        </form>
        <button class="btn btn-success" type="button" (click)="googleAuth()">Google</button>
    `,
})
//@CanActivate(() => !AuthService.isAuthenticated)
export class LoginComponent {
    private _loginForm: ControlGroup;
    private _errorMessage: string;
    private _authService: AuthService;
    private _router: Router;

    constructor(authService: AuthService, router: Router, fb: FormBuilder) {
        this._authService = authService;
        this._router = router;

        this._loginForm = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
    }

    private login(event: Event) {
        const formValues = this._loginForm.value;

        this._authService.login(new UserAuth(formValues.login, formValues.password))
            .then(
                v => { this._router.navigateByUrl('/'); },
                err => { this._errorMessage = err.json().message; }
            );

        event.preventDefault();
    }

    private googleAuth() {
        const client_id = '485536209797-3anuruct40e9i5fefqacsej0rn23lsu5.apps.googleusercontent.com';
        const url = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${client_id}&redirect_uri=${window.location.origin}&scope=profile email`;
        const options = `width=500, height=500, left=${(window.outerWidth - 500) / 2}, top=${(window.outerHeight - 500) / 2.5}`;

        const popup = window.open(url, '', options);

        const handleMessage = event => {
            if (event.origin === window.location.origin) {
                popup.close();
                this._authService.authGoogle({
                    clientId: client_id,
                    code: event.data,
                }).then(v => { this._router.navigateByUrl('/'); });

                window.removeEventListener('message', handleMessage);
            }
        };

        window.addEventListener('message', handleMessage);
    }
}