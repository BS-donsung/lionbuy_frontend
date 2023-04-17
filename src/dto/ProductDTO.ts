
export interface NamePrice {
    product : string
    price: number
}
export class LowerPrice implements NamePrice {
    product : string;
    price : number;
    date : Date
}
export class NameTag {
    product : string
    tags : Array<string>
}
export class LowerPriceByMall implements LowerPrice {
    product : string
    price : number
    date : Date
    mall : string
}

export class WishItemDTO {
    product :  string
    lowerprice : number
    image_url : string
    priority : number
    choice_date  : Date
}