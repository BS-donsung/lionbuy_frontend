import {HTTP_METHOD, RequestInfo} from "./index";

export const URI_OF_LOGIN = new RequestInfo(HTTP_METHOD.POST, "/auth/login")
export const URI_OF_LOGOUT = new RequestInfo(HTTP_METHOD.POST, "/auth/logout")
export const URI_OF_REGISTER = new RequestInfo(HTTP_METHOD.POST, "/auth/register")
export const URI_OF_UPDATE = new RequestInfo(HTTP_METHOD.PUT, "/auth/update")
export const URI_OF_DEACTIVATE = new RequestInfo(HTTP_METHOD.DELETE, "/auth/update")