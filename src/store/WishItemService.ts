import {defineStore} from "pinia";
import {CachedListContainer} from "../abstract/CachedListContainer";
import {WishItemDTO} from "../dto/ProductDTO";
import {
    URI_OF_WISH_ADD,
    URI_OF_WISH_DELETE,
    URI_OF_WISH_SELECT,
    URI_OF_WISH_UPDATE
} from "../requestinfo/WishListServiceInfo";

const useWishListStore =
    defineStore("WishListStore", () => {
        const distinctBase = (item : WishItemDTO ) => item.product
        type distinctFunc = typeof distinctBase
        type StandardType = ReturnType<distinctFunc>
        const cacheContainer = new CachedListContainer<WishItemDTO, StandardType, distinctFunc>(distinctBase)

        function selectWishList() : Array<WishItemDTO> {
            return cacheContainer.getDataList()
        }
        function selectWishListTotalPrice() : number {
            return cacheContainer.getDataList().reduce( (acc, curr) => (acc + curr.lowerprice), 0)
        }

        async function updateCache( month : number, year : number ) : Promise<boolean> {
            return cacheContainer.updateCache(URI_OF_WISH_SELECT)
        }

        function addWishItem( wishItemDTO : WishItemDTO ) : Promise<boolean> {
            return cacheContainer.add(URI_OF_WISH_ADD, wishItemDTO)
        }
        function updatePurchasedItem( wishItemDTO : WishItemDTO ) : Promise<boolean> {
            return cacheContainer.add(URI_OF_WISH_UPDATE, wishItemDTO)
        }
        function deletePurchasedItem( wishItemDTO : WishItemDTO ) : Promise<boolean> {
            return cacheContainer.add(URI_OF_WISH_DELETE, wishItemDTO)
        }

        return {
            selectWishList, selectWishListTotalPrice,
            updateCache,
            addWishItem, updatePurchasedItem, deletePurchasedItem
        }
    })
