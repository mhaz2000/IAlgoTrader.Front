import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserLoginRequest } from "../models/Login/userLoginRequest";
import { RegisterUserRequest } from "../models/register/registerUserRequest";
import { UserInformation } from "../models/user/updateUserInformation";
import { CookieService } from "../services/cookieService";

@Injectable()
export class UserService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    private backendHttpClient: HttpClient;

    constructor(private httpClient: HttpClient, private cookieService: CookieService, httpBackend: HttpBackend) {
        this.backendHttpClient = new HttpClient(httpBackend);
    }

    login(user: UserLoginRequest): Observable<any> {
        const body = JSON.stringify(user);
        return this.httpClient.post(this.baseUrl + '/api/user/login', body, { 'headers': this.headers })
    }

    register(user: RegisterUserRequest): Observable<any> {
        const body = JSON.stringify(user);
        return this.httpClient.post(this.baseUrl + '/api/user/register', body, { 'headers': this.headers })
    }

    update(user: UserInformation): Observable<any> {
        const body = JSON.stringify(user);
        return this.httpClient.put(this.baseUrl + '/api/user', body, {
            'headers': {
                'content-type': 'application/json'
            }
        })
    }

    getUser(): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/user/UserDetail', {
            'headers': {
                'content-type': 'application/json'
            }
        })
    }

    getUsers(pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/user', {
            'headers': {
                'content-type': 'application/json'
            },
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize }
        })
    }

    isAdmin() {
        const token = this.cookieService.getCookie('authToken');
        return this.backendHttpClient.get(this.baseUrl + '/api/user/admin', {
            'headers': {
                'content-type': 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
    }

    isLoggedIn() {
        const token = this.cookieService.getCookie('authToken');
        return this.backendHttpClient.get(this.baseUrl + '/api/user/user', {
            'headers': {
                'content-type': 'application/json',
                'authorization' : `Bearer ${token}`
            }
        })
    }
}