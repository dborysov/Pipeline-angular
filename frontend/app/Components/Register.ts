import {Component, View, FormBuilder, Validators, ControlGroup} from 'angular2/angular2';
import {Router, CanActivate} from 'angular2/router';
import {AuthService} from '../Services/AuthService';
import {UserAuth} from '../Models/UserAuth';

@Component({
    bindings: [AuthService, FormBuilder]
})
@CanActivate(() => !AuthService.isAuthenticated)
@View({
    template: `
        <form [ng-form-model]="_registrationForm" (submit)="register($event)">
            <input ng-control="login" type="text" placeholder="Login">
            <input ng-control="password" type="password" placeholder="Password">
            <button class="btn btn-success-line" type="submit">Register</button>
            <div>{{ _errorMessage }}</div>
        </form>
    `
})
export class RegisterComponent {
    private _registrationForm: ControlGroup;
    private _errorMessage: string;

    constructor(private _authService: AuthService, private _router: Router, fb: FormBuilder) {
        this._registrationForm = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    register(event: Event) {
        const formValues = this._registrationForm.value;

        this._authService.register(new UserAuth(formValues.login, formValues.password)).then(v => {
            this._router.navigateByUrl('/');
        }, err => { this._errorMessage = err.json().message; });
        event.preventDefault();
    }
}