import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TransactionService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    constructor(private httpClient: HttpClient) {
    }

    get(pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/SymbolTransaction',
            {
                'headers': this.headers,
                params: { 'pageIndex': pageIndex, 'pageSize': pageSize }
            });
    }

    getSymbols(): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/SymbolTransaction/GetSymbols',
            {
                'headers': this.headers,
            });
    }

    getSymbolTransactions(id: string, pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/SymbolTransaction/GetDetail/' + id,
            {
                'headers': this.headers,
                params: { 'pageIndex': pageIndex, 'pageSize': pageSize }
            });
    }

    getStatistics(): Observable<any>{
        return this.httpClient.get(this.baseUrl + '/api/SymbolTransaction/GetStatistics',
            {
                'headers': this.headers,
            });
    }
}