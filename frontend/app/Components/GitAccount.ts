import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {OnActivate, RouteSegment, RouteTree, ROUTER_DIRECTIVES} from '@angular/router';
import {GitService} from '../Services/GitService';
import {GitAccount} from '../Models/GitAccount';

@Component({
    bindings: [GitService],
    directives: [NgIf, ROUTER_DIRECTIVES],
    selector: 'account',
    template: `
        <div *ngIf="_account">
            <a class="btn btn-default" [routerLink]="['/']">Back</a><br />
            <p class="margin-std">
                <img width="100" src="{{_account.avatarUrl}}" alt="avatar">
                <a href="{{_account.gitUrl}}">{{_account.login}}</a> ({{_account.email}})
            </p>
        </div>
    `,
})
export class GitAccountComponent implements OnActivate {
    private _account: GitAccount;

    constructor(private gitService: GitService) { }

    public routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
        this.gitService
            .getUser(curr.getParam('login'))
            .then(account => this._account = account);
    }
}
