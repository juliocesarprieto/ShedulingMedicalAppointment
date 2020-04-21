import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(catchError((err) => {
                let error;

                if (err.status === 401 || err.status === 403) {
                    error = {
                        status: err.status,
                        message: JSON.parse(err.error).message
                    };
                } else {
                    error = {
                        status: err.error.status,
                        message: err.error.message
                    } || err.statusText;
                }


                return throwError(error);
            }));
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
