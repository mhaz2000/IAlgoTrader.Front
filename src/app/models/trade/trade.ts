export class Trade {
    constructor(public id: string, public sellVolume: number, public buyVolume: number,
        public price: number, public date: string,
        public orderType: string, public algorithmType: string, public orderNumber: number) { }
}