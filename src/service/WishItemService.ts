import {defineStore} from "pinia";
import {CachedListContainer} from "../abstract/CachedListContainer";
import {WishItemDTO} from "../dto/ProductDTO";
import {
    URI_OF_WISH_ADD,
    URI_OF_WISH_DELETE,
    URI_OF_WISH_SELECT,
    URI_OF_WISH_UPDATE
} from "../requestinfo/WishListServiceInfo";

const useWishListService =
    defineStore("wishlist", () => {
        const distinctBase = (item : WishItemDTO ) => item.product
        const cacheContainer = new CachedListContainer<WishItemDTO>(distinctBase)

        function selectWishList() : Array<WishItemDTO> {
            return cacheContainer.getDataList()
        }
        function selectWishListTotalPrice() : number {
            return cacheContainer.getDataList().map( item => item.lowerprice ).reduce( acc, curr => acc + curr, 0)
        }

        async function updateCache( month : number, year : number ) : Promise<boolean> {
            await cacheContainer.updateCache(URI_OF_WISH_SELECT)
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
