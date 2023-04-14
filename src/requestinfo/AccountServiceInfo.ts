import {HTTP_METHOD, RequestInfo} from "./index";

export const URI_OF_ACCOUNT_SELECT = RequestInfo.of(HTTP_METHOD.GET, "/account")
export const URI_OF_ACCOUNT_ADD = RequestInfo.of(HTTP_METHOD.POST, "/account")
export const URI_OF_ACCOUNT_UPDATE = RequestInfo.of(HTTP_METHOD.PUT, "/account")
export const URI_OF_ACCOUNT_DELETE : RequestInfo = RequestInfo.of(HTTP_METHOD.DELETE, "/account")