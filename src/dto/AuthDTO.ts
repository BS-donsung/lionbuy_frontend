

export class AuthDTO {
    principal : string
    credential : string
}

export class CreateUserDTO extends AuthDTO {
    username : string
}


//
// export class PurchasedItemDetailDTO implements PurchasedItemDTO {
//     product: string;
//     dateOfPurchase: Date;
//     price : number;
//     //
// }
