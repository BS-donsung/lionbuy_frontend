import {HTTP_METHOD, RequestInfo} from "./index";
import {AuthBehavior} from "../service/AuthService";

export const URI_OF_AUTH_LOGIN = new RequestInfo(HTTP_METHOD.POST, "/auth/login")
export const URI_OF_AUTH_LOGOUT = new RequestInfo(HTTP_METHOD.POST, "/auth/logout")
export const URI_OF_AUTH_REGISTER = new RequestInfo(HTTP_METHOD.POST, "/auth/register")
export const URI_OF_AUTH_UPDATE = new RequestInfo(HTTP_METHOD.PUT, "/auth/update")
export const URI_OF_AUTH_DEACTIVATE = new RequestInfo(HTTP_METHOD.DELETE, "/auth/update")
export const BROWSER_URI_AUTH =
    new AuthBehavior(
        URI_OF_AUTH_LOGIN,
        URI_OF_AUTH_LOGOUT,
        URI_OF_AUTH_REGISTER,
        URI_OF_AUTH_UPDATE,
        URI_OF_AUTH_DEACTIVATE
    )