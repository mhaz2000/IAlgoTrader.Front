import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "../services/cookieService";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private cookieService: CookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.cookieService.getCookie('authToken');
        let isFromWebsite = false;
        if (token) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationStart)
        //         if (event.url.includes('website'))
        //             isFromWebsite = true;
        // })

        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if ((error.status == 401 || error.status == 403) && !isFromWebsite) {
                        this.router.navigate(['signIn']);
                    }
                    return throwError(() => error);
                })
            )
    }
}