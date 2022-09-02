export class TransactionModel {
    constructor(public id: string, public symbolId: string, public date: string,
        public symbolName: string, public numberTrade: number, public closePrice: number,
        public lastPrice: number, public priceMin: number, public priceMax: number, public priceFirst: number) { }
}