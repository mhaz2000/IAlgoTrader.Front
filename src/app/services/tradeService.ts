import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TradeService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    constructor(private httpClient: HttpClient) { }

    getTrades(pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/Trade', 
        {
            'headers': this.headers,
            params: { 'pageIndex': pageIndex, 'pageSize': pageSize }
        });
    }

}