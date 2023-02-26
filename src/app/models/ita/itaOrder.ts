export class ItaOrder {
    constructor(public symbolId: string, public buyCommand: ItaBuyOrder | null, public sellCommand: ItaSellOrder | null) { }
}

export class ItaSellOrder {
    constructor(public startLimit: number, public stopLimit: number, public dailyShares: string, public maximumShares: number | null) { }
}

export class ItaBuyOrder {
    constructor(public startLimit: number, public stopLimit: number, public dailyShares: string, public maximumShares: number | null) { }
}