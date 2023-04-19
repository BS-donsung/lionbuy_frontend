
export class PurchasedItemDTO {
    product : string
    dateOfPurchase : Date

    constructor(product : string, dateOfPurchase : Date) {
        this.product = product;
        this.dateOfPurchase = dateOfPurchase
    }
}

export class PurchasedItemDetailDTO implements PurchasedItemDTO {
    product: string;
    dateOfPurchase: Date;
    price : number;
}