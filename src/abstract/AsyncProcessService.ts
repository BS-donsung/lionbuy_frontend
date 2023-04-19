import {ProcessStatus} from "../enums/ProcessStatus";
import {HTTP_METHOD, RequestInfo} from "../requestinfo"
import {Optional} from "typescript-optional"

export class AsyncProcessService extends ProcessStatus {

    async asyncProcessing<_ResTp, _InpTp>( requestInfo : RequestInfo, inputData : _InpTp | undefined = undefined) : Promise<Optional<_ResTp>> {
        try {
            // processing이 진행중이면 false를 리턴한다.
            if(this.isPending())
                return Optional.empty();

            this.setPending()
            // logic start

            const response = await fetch(requestInfo.uri, AsyncProcessService.setFetchOption(requestInfo, inputData) )
            const result : _ResTp = await response.json()
            // logic end

            this.setSuccess()
            return Optional.of(result)
        } catch (e) {
            this.setFailure()
            return Optional.empty();
        }
    }

    static setFetchOption<_InpTp>( requestInfo : RequestInfo, inputData : _InpTp | undefined = undefined) : RequestInit {
        if( this.isBodyRequestMethod(requestInfo.method)  || inputData == undefined )
            return { method : requestInfo.method }
        else
            return { method : requestInfo.method, body : JSON.stringify(inputData) }
    }

    static isBodyRequestMethod( httpRequest : HTTP_METHOD) : boolean {
        if( httpRequest == HTTP_METHOD.GET || httpRequest == HTTP_METHOD.DELETE )
            return false
        else
            return true
    }
}