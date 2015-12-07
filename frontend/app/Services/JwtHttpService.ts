import {Injectable, provide} from 'angular2/angular2';
import {Http, RequestOptionsArgs, Headers, ConnectionBackend, RequestOptions, XHRBackend} from 'angular2/http';
import {AuthService} from './AuthService';

export class JwtHttp extends Http {
    private _options = {
        headerName: 'Authorization',
        headerPrefix: 'Bearer'
    };

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) { super(backend, defaultOptions); }

    get(url: string, options?: RequestOptionsArgs) {
        if (!AuthService.isAuthenticated) {
            return super.get(url, options);
        }

        if (options) {
            if (options.headers) {
                options.headers.set(this._options.headerName, `${this._options.headerPrefix} ${AuthService.currentUserToken}`)
            } else {
                options.headers = new Headers({ [this._options.headerName]: `${this._options.headerPrefix} ${AuthService.currentUserToken}` })
            }
        } else {
            options = { headers: new Headers({ [this._options.headerName]: `${this._options.headerPrefix} ${AuthService.currentUserToken}` }) };
        }

        return super.get(url, options);
    }
}

export const JWT_HTTP_PROVIDER = provide(JwtHttp, {
    useFactory: (xhrBackend, requestOptions) => new JwtHttp(xhrBackend, requestOptions),
    deps: [XHRBackend, RequestOptions]
});;