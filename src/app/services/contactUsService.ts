import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ContactUsForm } from "../models/contactUs/contactUsForm";
import { ContactUs } from "../models/contactUs/contactUsUpdate";

@Injectable()
export class ContactUsService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    constructor(private httpClient: HttpClient) { }

    update(contactUsUpdate: ContactUs): Observable<any> {
        const body = JSON.stringify(contactUsUpdate);
        return this.httpClient.put(this.baseUrl + '/api/contactUs', body, { 'headers': this.headers })
    }

    get(): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/contactUs', { 'headers': this.headers })
    }

    sendForm(contactUsForm: ContactUsForm) {
        const body = JSON.stringify(contactUsForm);
        return this.httpClient.post(this.baseUrl + '/api/contactUsForm', body, { 'headers': this.headers })
    }

    getForms(pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/ContactUsForm',
            { 'headers': this.headers, params: { 'pageIndex': pageIndex, 'pageSize': pageSize } });
    }
}