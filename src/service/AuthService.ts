import {defineStore} from "pinia"
import {ProcessStatus, STATUS} from "../enums/ProcessStatus";
import { URI_OF_DEACTIVATE, URI_OF_LOGIN, URI_OF_REGISTER, URI_OF_UPDATE} from "../requestinfo/AuthRequestInfo"
import {AsyncProcessService} from "./AsyncProcessService";
import {AuthDTO, CreateUserDTO} from "../dto/AuthDTO";
import {RequestInfo} from "../requestinfo";

class AccountInfo {
    username : string = ""
    principal : string = ""
    isAuthentication : boolean = false;
}

export interface AuthServiceState {
    currentAccount? : AccountInfo;
}

export interface AuthServiceMethod {
    // getinfo( email : string, password : string ) : Promise<boolean>
    login( email : string, password : string ) : Promise<boolean>
    logout() : Promise<boolean>

    register( email : string, password : string ) : Promise<boolean>
    update( account : AccountInfo, password : string ) : Promise<boolean>
    deactivate( account : AccountInfo, password : string ) : Promise<boolean>
}

export interface AuthService extends AuthServiceState, AuthServiceMethod {}
type responseType = { username : string, principal : string }

export const useAuthService =
    defineStore("AuthService", () => {
        const currentAccount = new AccountInfo()
        const isAuthentication = false;

        const asyncService = new AsyncProcessService();

        async function login( authDTO : AuthDTO ) : Promise<boolean> {
            return asyncGetInfo(URI_OF_LOGIN, authDTO)
        }

        function logout() : Promise<boolean> {
            // empty
            clearCurrentAccountInfo()
            return Promise.resolve(true)
        }

        async function register( createUserDto : CreateUserDTO ) : Promise<boolean> {
            return asyncGetInfo(URI_OF_LOGIN, createUserDto)
        }
        // async function update( account : AccountInfo, password : string ) : Promise<boolean> {
        //     const inputData = { account, password }
        //     return asyncGetInfo(URI_OF_UPDATE, inputData)
        // }
        async function deactivate( authDTO : AuthDTO ) : Promise<boolean> {

            await asyncService.asyncInputProcessing(URI_OF_DEACTIVATE, authDTO)
            clearCurrentAccountInfo()
            return true
        }

        function clearCurrentAccountInfo() {
            this.currentAccount = new AccountInfo()
        }
        async function asyncGetInfo<_ResTp, _InpTp>( requestInfo : RequestInfo, inputData : _InpTp) : Promise<boolean> {
            try {
                const optionalResult = await asyncService.asyncProcessing<responseType>(requestInfo, inputData)
                if(optionalResult.isEmpty()) {
                    return false;
                }
                // currentAccount 세팅
                // isAuthentication 처리
                const result = optionalResult.get()
                const newAccountInfo : AccountInfo = {
                    username : string = result.username,
                    principal : string = result.principal,
                    isAuthentication : boolean = true
                }
                this.currentAccount = newAccountInfo;
                return true
            } catch {
                return false
            }
        }

        // updat

        return { currentAccount, isAuthentication,
            login, logout,
            register, update, deactivate}
    })