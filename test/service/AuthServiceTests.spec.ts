import {CachedItemContainer} from "../../src/abstract/CachedItemContainer";
import {AccountInfo, AuthBehavior} from "../../src/service/AuthService";
import {
    URI_OF_AUTH_DEACTIVATE,
    URI_OF_AUTH_LOGIN,
    URI_OF_AUTH_LOGOUT,
    URI_OF_AUTH_REGISTER,
    URI_OF_AUTH_UPDATE
} from "../../src/requestinfo/AuthRequestInfo";

const { AuthService } = require("@/service/AuthService")


// @ts-ignore
const HOST_AND_PORT : string = global.HOST;
export const TEST_URI_AUTH =
    new AuthBehavior(
        URI_OF_AUTH_LOGIN.setHostExplicitly(HOST_AND_PORT),
        URI_OF_AUTH_LOGOUT.setHostExplicitly(HOST_AND_PORT),
        URI_OF_AUTH_REGISTER.setHostExplicitly(HOST_AND_PORT),
        URI_OF_AUTH_UPDATE.setHostExplicitly(HOST_AND_PORT),
        URI_OF_AUTH_DEACTIVATE.setHostExplicitly(HOST_AND_PORT)
    )
describe("test", () => {

    const authService = new AuthService(TEST_URI_AUTH);

})