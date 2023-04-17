import {HTTP_METHOD, RequestInfo} from "./index";

export const URI_OF_WISH_SELECT = RequestInfo.of(HTTP_METHOD.GET, "/wishlist")
export const URI_OF_WISH_ADD = RequestInfo.of(HTTP_METHOD.POST, "/wishlist")
export const URI_OF_WISH_UPDATE = RequestInfo.of(HTTP_METHOD.PUT, "/wishlist")
export const URI_OF_WISH_DELETE : RequestInfo = RequestInfo.of(HTTP_METHOD.DELETE, "/wishlist")