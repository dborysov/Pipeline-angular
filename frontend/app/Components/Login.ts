import {Component, View, FormBuilder, Validators, ControlGroup} from 'angular2/angular2';
import {RouterLink, Router, CanActivate} from 'angular2/router';
import {AuthService} from '../Services/AuthService';
import {UserAuth} from '../Models/UserAuth';

@Component({
    bindings: [AuthService, FormBuilder]
})
@CanActivate(() => !AuthService.isAuthenticated)
@View({
    directives: [RouterLink],
    template: `
        <form [ng-form-model]="_loginForm" (submit)="login($event)">
            <input ng-control="login" type="text" placeholder="Login">
            <input ng-control="password" type="password" placeholder="Password">
            <button class="btn btn-success-line" type="submit">Login</button>
            <div>{{ _errorMessage }}</div>
            <a [router-link]="['/Register']">Register</a>
        </form>
    `
})
export class LoginComponent{
    private _loginForm : ControlGroup;
    private _errorMessage: string;

    constructor(private _authService: AuthService, private _router: Router, fb: FormBuilder) {
        this._loginForm = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    login(event: Event) {
        const formValues = this._loginForm.value;

        this._authService.login(new UserAuth(formValues.login, formValues.password)).then(v => {
            this._router.navigateByUrl('/');
        }, err => {this._errorMessage = err});

        event.preventDefault();
    }
}