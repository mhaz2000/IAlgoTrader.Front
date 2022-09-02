export class TwapOrder {
    constructor(public sharesNumber: number, public price: number, public timePeriod: number, public orderType: number,
        public symbolId:string) { }
}