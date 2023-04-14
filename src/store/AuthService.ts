import {defineStore} from "pinia"
import {ProcessStatus, STATUS} from "../enums/ProcessStatus";
import { URI_OF_DEACTIVATE, URI_OF_LOGIN, URI_OF_REGISTER, URI_OF_UPDATE} from "../requestinfo/AuthRequestInfo"
import {AsyncProcessService} from "./AsyncProcessService";

class AccountInfo {
    username : string = ""
    principal : string = ""
    credential : string = ""
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

export const useAuthService =
    defineStore("AuthService", () => {
        const currentAccount = new AccountInfo()
        const isAuthentication = false;

        const asyncService = new AsyncProcessService();

        async function login( email : string, password : string ) : Promise<boolean> {
            const inputData = { email, password }
            const loginProcessing = () => {
                currentAccount.username = "success"
                currentAccount.principal = "success@gmail.com"
                currentAccount.credential = "success1234"
                currentAccount.isAuthentication = true
            }
            return asyncService.asyncProcessing(URI_OF_LOGIN, inputData, loginProcessing)
        }

        async function logout() : Promise<boolean> {
            return Promise.resolve(true)
        }

        async function register( email : string, password : string ) : Promise<boolean> {
            const inputData = { email, password }
            const loginProcessing = () => {
                currentAccount.username = "success"
                currentAccount.principal = "success@gmail.com"
                currentAccount.credential = "success1234"
                currentAccount.isAuthentication = true
            }
            return asyncService.asyncProcessing(URI_OF_REGISTER, loginProcessing)
        }
        async function update( account : AccountInfo, password : string ) : Promise<boolean> {
            const inputData = { account, password }
            return asyncService.asyncInputProcessing(URI_OF_UPDATE, inputData)
        }
        async function deactivate( account : AccountInfo, password : string ) : Promise<boolean> {
            const inputData = { account, password }
            return asyncService.asyncInputProcessing(URI_OF_DEACTIVATE, inputData)
        }

        return { currentAccount, isAuthentication,
            login, logout,
            register, update, deactivate}
    })