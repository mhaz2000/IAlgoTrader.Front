import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ItaOrder } from "../models/ita/itaOrder";
import { PovOrder } from "../models/pov/povOrder";
import { TwapOrder } from "../models/twap/twapOrder";
import { VWAPOrder } from "../models/vwap/vwapOrder";

@Injectable()
export class OrderService {
    baseUrl: string = environment.baseUrl;

    headers = {
        'content-type': 'application/json'
    };

    constructor(private httpClient: HttpClient) {
    }

    sendTwapOrder(twapOrder: TwapOrder): Observable<any> {
        const body = JSON.stringify(twapOrder);
        return this.httpClient.post(this.baseUrl + '/api/TWAP/Order', body,
            {
                'headers': this.headers,
            });
    }

    sendVwapOrder(vwapOrder: VWAPOrder): Observable<any> {
        const body = JSON.stringify(vwapOrder);
        return this.httpClient.post(this.baseUrl + '/api/VWAP/order', body,
            {
                'headers': this.headers,
            });
    }

    sendPovOrder(povOrder: PovOrder): Observable<any> {
        const body = JSON.stringify(povOrder);
        return this.httpClient.post(this.baseUrl + '/api/POV/order', body,
            {
                'headers': this.headers,
            });
    }

    sendItaOrder(itaOrder: ItaOrder): Observable<any> {
        const body = JSON.stringify(itaOrder);
        return this.httpClient.post(this.baseUrl + '/api/ITA/order', body,
            {
                'headers': this.headers,
            });
    }

    getOrders(pageSize: number, pageIndex: number): Observable<any> {
        return this.httpClient.get(this.baseUrl + '/api/order',
            {
                'headers': this.headers,
                params: { 'pageIndex': pageIndex, 'pageSize': pageSize }
            });
    }
}