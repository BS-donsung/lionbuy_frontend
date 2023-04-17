import {defineStore} from "pinia";
import {PurchasedItemDetailDTO, PurchasedItemDTO} from "../dto/AccountDTO";
import {
    URI_OF_ACCOUNT_ADD,
    URI_OF_ACCOUNT_DELETE,
    URI_OF_ACCOUNT_SELECT,
    URI_OF_ACCOUNT_UPDATE
} from "../requestinfo/AccountServiceInfo";
import {AsyncProcessService} from "./AsyncProcessService";


const useAccountBookService =
    defineStore("accountbook", () => {

        const asyncService = new AsyncProcessService();
        const distinctBase = (item : PurchasedItemDetailDTO ) => { return { "product" : item.product, "date" : item.dateOfPurchase } }
        const purchasedItemList=
            new DistinctSet<PurchasedItemDetailDTO, object>(distinctBase);

        // Select 함수
        function selectByMonth( month : number, year : number ) : Array<PurchasedItemDTO>{
            return this.purchasedItemList.filter( item => {
                return (item.dateOfPurchase.getMonth() == month) && (item.dateOfPurchase.getUTCFullYear() == year)
            })
        }

        function selectPriceByMonth( month : number, year : number ) : number {
            return this.selectByMonth(month, year).map( item => item.price ).reduce( (acc, curr) => acc + curr, 0)
        }

        // Async 함수
        async function getPurchasedItemList() {
                    try {
                        const optionalResult = await asyncService.asyncProcessing<PurchasedItemDetailDTO[]>(URI_OF_ACCOUNT_SELECT)
                        if(optionalResult.isEmpty())
                            return false;
                        const result = optionalResult.get()
                        this.purchasedItemList.add(result)
            } catch {
                return false
            }
        }

        async function addPurchasedItem( purchaseditem : PurchasedItemDetailDTO ) {
            try {
                await asyncService.asyncInputProcessing(URI_OF_ACCOUNT_ADD, purchaseditem)
                this.purchasedItemList.add(purchaseditem)
                return true;
            } catch {
                return false;
            }
        }

        async function updatePurchasedItem( purchaseditem : PurchasedItemDetailDTO ){
            try {
                await asyncService.asyncProcessing(URI_OF_ACCOUNT_UPDATE, purchaseditem)
                purchasedItemList.update(purchaseditem)
                return true
            } catch {
                return false
            }
        }

        async function deletePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean> {
            try {
                await asyncService.asyncProcessing(URI_OF_ACCOUNT_DELETE, purchaseditem)
                purchasedItemList.delete(purchaseditem)
                return true
            } catch {
                return false
            }
        }

        return { purchasedItemList, findByMonth, selectPriceByMonth,
            getPurchasedItemList,
            addPurchasedItem, updatePurchasedItem, deletePurchasedItem
        }
    })