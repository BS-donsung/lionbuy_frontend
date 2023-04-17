import {defineStore} from "pinia";
import {PurchasedItemDetailDTO, PurchasedItemDTO} from "../dto/AccountDTO";
import {
    URI_OF_ACCOUNT_ADD,
    URI_OF_ACCOUNT_DELETE,
    URI_OF_ACCOUNT_SELECT,
    URI_OF_ACCOUNT_UPDATE
} from "../requestinfo/AccountServiceInfo";
import {AsyncProcessService} from "./AsyncProcessService";


const AccountService =
    defineStore("buyinglist", () => {

        const asyncService = new AsyncProcessService();
        // cashed data
        const distinctFilter = (value : PurchasedItemDTO) => { return true; }
        const purchasedItemList : DistinctSet<PurchasedItemDetailDTO> = new DistinctSet( )

        function selectByMonth( month : number, year : number ) : Array<PurchasedItemDTO>{
            return this.perchasedList.filter( item => {
                return item.dateOfPurchase.getMonth() && item.dateOfPurchase.getUTCFullYear()
            })
        }
        function selectPriceByMonth( month : number, year : number ) : number {
            return this.selectByMonth(month, year).map( item => item.price ).reduce()
        }
        async function getPurchasedItemList() {
            return asyncService.asyncOutputProcessing(URI_OF_ACCOUNT_SELECT, ( data : Array<PurchasedItemDetailDTO>) => {
                data
                // get Data processing & store
                // mocking
                // this.purchasedList.add(data["data"]);
                // 현재 데이터와 중복된 데이터를 제외하고 어떤 데이터를 얻었는지? 아니면 뒤에 쿼리 문을 작성
            })
        }

        async function addPurchasedItem( purchaseditem : PurchasedItemDetailDTO ) {
            return asyncService.asyncInputProcessing(URI_OF_ACCOUNT_ADD, purchaseditem)
        }

        async function updatePurchasedItem( purchaseditem : PurchasedItemDetailDTO ){
            return asyncService.asyncProcessing(URI_OF_ACCOUNT_UPDATE, purchaseditem, () => {

            })
        }

        async function deletePurchasedItem( purchaseditem : PurchasedItemDTO ) : Promise<boolean> {
            return asyncService.asyncProcessing(URI_OF_ACCOUNT_DELETE, purchaseditem)
        }

        return { perchasedList, findByMonth,
            getPurchasedItemList, addPurchasedItem, updatePurchasedItem, deletePurchasedItem}
    })