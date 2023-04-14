
export class PurchasedItemDTO {
    product : string
    dateOfPurchase : Date
}

export class PurchasedItemDetailDTO implements PurchasedItemDTO {
    product: string;
    dateOfPurchase: Date;
    purchasedPrice : number;
    //
}

