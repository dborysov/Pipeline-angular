import {Component, View, FormBuilder, Validators, ControlGroup} from 'angular2/angular2';
import {RouterLink} from 'angular2/router';
import {AuthService} from '../Services/AuthService';
import {UserAuth} from '../Models/UserAuth';

@Component({
    bindings: [AuthService, FormBuilder]
})
@View({
    directives: [RouterLink],
    template: `
        <form [ng-form-model]="loginForm" (submit)="login($event)">
            <input ng-control="login" type="text" placeholder="Login">
            <input ng-control="password" type="password" placeholder="Password">
            <button class="btn btn-success-line" type="submit">Login</button>
            <div>{{ errorMessage }}</div>
            <a [router-link]="['/Register']">Register</a>
        </form>
    `
})
export class LoginComponent{
    private loginForm : ControlGroup;
    private errorMessage: string;

    constructor(private authService: AuthService, fb: FormBuilder ) {
        this.loginForm = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    login(event: Event) {
        const formValues = this.loginForm.value;

        this.authService.login(new UserAuth(formValues.login, formValues.password)).then(v => {

        }, err => {this.errorMessage = err});
        event.preventDefault();
    }
}