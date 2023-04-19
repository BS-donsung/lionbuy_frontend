
import {
    URI_OF_AUTH_DEACTIVATE,
    URI_OF_AUTH_LOGIN,
    URI_OF_AUTH_LOGOUT,
    URI_OF_AUTH_REGISTER,
    URI_OF_AUTH_UPDATE
} from "../requestinfo/AuthRequestInfo"
import {AuthDTO, CreateUserDTO} from "../dto/AuthDTO";
import {CachedItemContainer} from "../abstract/CachedItemContainer";
import {map} from "../util/Functor";
import {RequestInfo} from "../requestinfo";

export class AccountInfo {
    username : string = ""
    principal : string = ""
    isAuthentication : boolean = false;
}

type ResponseAuthInfo = { username : string, principal : string };
const mappingResponseDtoToAccountInfo = (item : ResponseAuthInfo) => { return { ...item, isAuthentication : true } }

export class AuthBehavior {
    login : RequestInfo
    logout : RequestInfo
    register : RequestInfo
    updateInfo : RequestInfo
    deactivate : RequestInfo

    constructor( login : RequestInfo, logout : RequestInfo, register : RequestInfo, updateInfo : RequestInfo, deactivate : RequestInfo) {
        this.login = login
        this.logout = logout
        this.register = register
        this.updateInfo = updateInfo
        this.deactivate = deactivate
    }

    static of( login : RequestInfo, logout : RequestInfo, register : RequestInfo, updateInfo : RequestInfo, deactivate : RequestInfo) : AuthBehavior {
        return new AuthBehavior(login, logout, register, updateInfo, deactivate)
    }
}
export class AuthService extends CachedItemContainer<AccountInfo> {

    authBehavior : AuthBehavior
    constructor( authBehavior : AuthBehavior ) {
        super(new AccountInfo());
        this.authBehavior = authBehavior
    }

    async login( authDTO : AuthDTO ) : Promise<boolean> {

        const optionalResult =
            await this.asyncProcessing<ResponseAuthInfo, AuthDTO>(this.authBehavior.login, authDTO)
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
        return await this.clear(this.authBehavior.logout)
    }

    async register( createUserDto : CreateUserDTO ) : Promise<boolean> {
        const optionalResult =
            await this.asyncProcessing<ResponseAuthInfo, AuthDTO>(this.authBehavior.register, createUserDto)
        if(optionalResult.isEmpty()) {
            return false;
        }
        const verifiedAccountInfo = map(optionalResult.get(), mappingResponseDtoToAccountInfo)
        this.setData(verifiedAccountInfo)
        return true;
    }

    async updateInfo( createUserDto : CreateUserDTO ) : Promise<boolean> {
        const optionalResult =
            await this.asyncProcessing<ResponseAuthInfo, AuthDTO>(this.authBehavior.updateInfo, createUserDto)
        if(optionalResult.isEmpty()) {
            return false;
        }
        const verifiedAccountInfo = map(optionalResult.get(), mappingResponseDtoToAccountInfo)
        this.setData(verifiedAccountInfo)
        return true;
    }

    async deactivate( password : string ) : Promise<boolean> {
        const passwordWrapByObject = { password }
        const optionalResult =
            await this.asyncProcessing<unknown, typeof passwordWrapByObject>(this.authBehavior.deactivate, passwordWrapByObject)
        if(optionalResult.isEmpty())
            return false
        this.forcingClear()
        return true;
    }
}
