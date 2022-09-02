import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TWAPRequest } from "../models/twap/twapRequest";

@Injectable()
export class AlgorithmService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    constructor(private httpClient: HttpClient) {
    }

    calculateVWAP(id: string): Observable<any> {
        return this.httpClient.post(this.baseUrl + '/api/VWAP/' + id, { 'headers': this.headers })
    }


    calculateTWAP(twap: TWAPRequest): Observable<any> {
        const body = JSON.stringify(twap);
        return this.httpClient.post(this.baseUrl + '/api/TWAP', body, { 'headers': this.headers })
    }

    getTradeNumbers(id: string): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/POV/' + id, { 'headers': this.headers })
    }
}