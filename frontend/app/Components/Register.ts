import {Component, View, FormBuilder, Validators, ControlGroup} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {AuthService} from '../Services/AuthService';
import {UserAuth} from '../Models/UserAuth';

@Component({
    bindings: [AuthService, FormBuilder]
})
@View({
    template: `
        <form [ng-form-model]="registrationForm" (submit)="register($event)">
            <input ng-control="login" type="text" placeholder="Login">
            <input ng-control="password" type="password" placeholder="Password">
            <button class="btn btn-success-line" type="submit">Register</button>
            <div>{{ errorMessage }}</div>
        </form>
    `
})
export class RegisterComponent {
    private registrationForm: ControlGroup;
    private errorMessage: string;

    constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
        this.registrationForm = fb.group({
            login: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }

    register(event: Event) {
        const formValues = this.registrationForm.value;

        this.authService.register(new UserAuth(formValues.login, formValues.password)).then(v => {
            this.router.navigateByUrl('/');
        }, err => { this.errorMessage = err });
        event.preventDefault();
    }
}