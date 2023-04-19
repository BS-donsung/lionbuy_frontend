import {defineStore} from "pinia";
import {PurchasedItemDetailDTO, PurchasedItemDTO} from "../dto/AccountDTO";
import {
    URI_OF_ACCOUNT_ADD,
    URI_OF_ACCOUNT_DELETE,
    URI_OF_ACCOUNT_SELECT,
    URI_OF_ACCOUNT_UPDATE
} from "../requestinfo/AccountBookServiceInfo";
import {CachedListContainer} from "../abstract/CachedListContainer";
import {curringFiltering} from "../util/FilterFunction";

interface AccountBookServiceInterface {
    selectByMonth( month : number, year : number ) : Array<PurchasedItemDTO>
    selectPriceByMonth( month : number, year : number ) : number
    //update
    addPurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean>
    updatePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean>
    deletePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean>
}

// clear cache


const useAccountBookStore =
    defineStore("AccountBookStore", () => {

        const distinctBase = (item : PurchasedItemDetailDTO ) => { return { "product" : item.product, "date" : item.dateOfPurchase } }
        type distinctFunc = typeof distinctBase
        type StandardType = ReturnType<distinctFunc>
        const cacheContainer = new CachedListContainer<PurchasedItemDetailDTO, StandardType, distinctFunc>(distinctBase)
        // Select 함수
        function selectItemListByMonth( month : number, year : number ) : Array<PurchasedItemDTO> {
            return cacheContainer.getDataList().filter( curringFiltering(month, year) )
        }

        function selectPriceByMonth( month : number, year : number ) : number {
            return cacheContainer.getDataList().filter( curringFiltering(month, year) ).reduce(
                (acc, curr) => acc + curr.price, 0
            )
        }
        // Async 함수
        async function updateList( month : number, year : number) {
            return cacheContainer.updateCache(URI_OF_ACCOUNT_SELECT.append(`?month=${month}&&year=${year}`))
        }

        async function addPurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean> {
            return cacheContainer.add(URI_OF_ACCOUNT_ADD, purchaseditem)
        }

        async function updatePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean> {
            return cacheContainer.update(URI_OF_ACCOUNT_UPDATE, purchaseditem)
        }

        async function deletePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean> {
            return cacheContainer.delete(URI_OF_ACCOUNT_DELETE, purchaseditem)
        }

        return { cacheContainer,
            selectItemListByMonth, selectPriceByMonth,
            updateList,
            addPurchasedItem, updatePurchasedItem, deletePurchasedItem
        }
    })


//
// const useAccountBookService =
//     defineStore("accountbook", () => {
//
//         const asyncService = new AsyncProcessService();
//         const distinctBase = (item : PurchasedItemDetailDTO ) => { return { "product" : item.product, "date" : item.dateOfPurchase } }
//         const purchasedItemList=
//             new DistinctSet<PurchasedItemDetailDTO, object>(distinctBase);
//
//         // Select 함수
//         function selectByMonth( month : number, year : number ) : Array<PurchasedItemDTO> {
//             return this.purchasedItemList.filter( item => {
//                 return (item.dateOfPurchase.getMonth() == month) && (item.dateOfPurchase.getUTCFullYear() == year)
//             })
//         }
//
//         function selectPriceByMonth( month : number, year : number ) : number {
//             return this.selectByMonth(month, year).map( item => item.price ).reduce( (acc, curr) => acc + curr, 0)
//         }
//
//         // Async 함수
//         async function getPurchasedItemList() {
//             try {
//                 const optionalResult = await asyncService.asyncProcessing<PurchasedItemDetailDTO[]>(URI_OF_ACCOUNT_SELECT)
//                 if(optionalResult.isEmpty())
//                     return false;
//                 const result = optionalResult.get()
//                 this.purchasedItemList.add(result)
//             } catch {
//                 return false
//             }
//         }
//
//         async function addPurchasedItem( purchaseditem : PurchasedItemDetailDTO ) {
//             try {
//                 await asyncService.asyncInputProcessing(URI_OF_ACCOUNT_ADD, purchaseditem)
//                 this.purchasedItemList.add(purchaseditem)
//                 return true;
//             } catch {
//                 return false;
//             }
//         }
//
//         async function updatePurchasedItem( purchaseditem : PurchasedItemDetailDTO ){
//             try {
//                 await asyncService.asyncProcessing(URI_OF_ACCOUNT_UPDATE, purchaseditem)
//                 purchasedItemList.update(purchaseditem)
//                 return true
//             } catch {
//                 return false
//             }
//         }
//
//         async function deletePurchasedItem( purchaseditem : PurchasedItemDetailDTO ) : Promise<boolean> {
//             try {
//                 await asyncService.asyncProcessing(URI_OF_ACCOUNT_DELETE, purchaseditem)
//                 purchasedItemList.delete(purchaseditem)
//                 return true
//             } catch {
//                 return false
//             }
//         }
//
//         return { purchasedItemList, findByMonth, selectPriceByMonth,
//             getPurchasedItemList,
//             addPurchasedItem, updatePurchasedItem, deletePurchasedItem
//         }
//     })
