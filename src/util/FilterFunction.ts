import {PurchasedItemDetailDTO} from "../dto/AccountDTO";

export function curringFiltering(month : number, year : number) : (item: PurchasedItemDetailDTO) => boolean  {
    return (item : PurchasedItemDetailDTO) => ((item.dateOfPurchase.getMonth() == month) && (item.dateOfPurchase.getUTCFullYear() == year))
}