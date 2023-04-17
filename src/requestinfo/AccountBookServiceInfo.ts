import {HTTP_METHOD, RequestInfo} from "./index";

export const URI_OF_ACCOUNT_SELECT = RequestInfo.of(HTTP_METHOD.GET, "/accountbook")
export const URI_OF_ACCOUNT_ADD = RequestInfo.of(HTTP_METHOD.POST, "/accountbook")
export const URI_OF_ACCOUNT_UPDATE = RequestInfo.of(HTTP_METHOD.PUT, "/accountbook")
export const URI_OF_ACCOUNT_DELETE : RequestInfo = RequestInfo.of(HTTP_METHOD.DELETE, "/accountbook")