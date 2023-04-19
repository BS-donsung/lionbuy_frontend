import {defineStore} from "pinia"
import {ProcessStatus, STATUS} from "../enums/ProcessStatus";
import {
    URI_OF_DEACTIVATE,
    URI_OF_LOGIN,
    URI_OF_LOGOUT,
    URI_OF_REGISTER,
    URI_OF_UPDATE
} from "../requestinfo/AuthRequestInfo"
import {AuthDTO, CreateUserDTO} from "../dto/AuthDTO";
import {CachedItemContainer} from "../abstract/CachedItemContainer";
import {map} from "../util/Functor";

export class AccountInfo {
    username : string = ""
    principal : string = ""
    isAuthentication : boolean = false;
}

type ResponseAuthInfo = { username : string, principal : string };
const mappingResponseDtoToAccountInfo = (item : ResponseAuthInfo) => { return { ...item, isAuthentication : true } }

export class AuthService extends CachedItemContainer<AccountInfo> {
    constructor() {
        super(new AccountInfo());
    }

    async login( authDTO : AuthDTO ) : Promise<boolean> {

        const optionalResult = await this.asyncProcessing<ResponseAuthInfo, AuthDTO>(URI_OF_LOGIN, authDTO)
        if(optionalResult.isEmpty()) {
            return false;
        }
        const verifiedAccountInfo : AccountInfo =
            map(optionalResult.get(), mappingResponseDtoToAccountInfo)
        this.setData(verifiedAccountInfo)
        return true;
    }

    async logout() : Promise<boolean> {
        // In Memory Data Clear
        this.forcingClear()
        // Authentication token defeasance
        return await this.clear(URI_OF_LOGOUT)
    }

    async register( createUserDto : CreateUserDTO ) : Promise<boolean> {
        const optionalResult = await this.asyncProcessing<ResponseAuthInfo, AuthDTO>(URI_OF_REGISTER, createUserDto)
        if(optionalResult.isEmpty()) {
            return false;
        }
        const verifiedAccountInfo = map(optionalResult.get(), mappingResponseDtoToAccountInfo)
        this.setData(verifiedAccountInfo)
        return true;
    }

    async deactivate( password : string ) : Promise<boolean> {
        const passwordWrapByObject = { password }
        const optionalResult = await this.asyncProcessing<unknown, typeof passwordWrapByObject>(URI_OF_DEACTIVATE, passwordWrapByObject)
        if(optionalResult.isEmpty())
            return false
        this.forcingClear()
        return true;
    }
}
