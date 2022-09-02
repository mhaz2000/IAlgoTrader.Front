export class OrderModel {
    constructor(public date: string, public algorithmType: string,
        public orderType: string, public symbolName: string, public isActive: string,
        public isCompleted: string, public orderNumber: number) { }
}