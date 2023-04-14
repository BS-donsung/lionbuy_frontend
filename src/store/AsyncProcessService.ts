import {ProcessStatus} from "../enums/ProcessStatus";
import {HTTP_METHOD, RequestInfo} from "../requestinfo"

export class AsyncProcessService extends ProcessStatus {

    async asyncProcessing<_InpTp, _ResTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined, callback : (_ResTp) => void = () => {}) : Promise<boolean> {
        try {
            // processing이 진행중이면 false를 리턴한다.
            if(this.isPending())
                return false;

            this.setPending()
            // logic start

            const response = await fetch(requestInfo.uri, this.setFetchOption(requestInfo, inputData) )
            const result : _ResTp = await response.json()
            callback(result)
            // logic end

            this.setSuccess()
            return true
        } catch (e) {
            this.setFailure()
            return false
        }
    }
    asyncInputProcessing<_InpTp, _ResTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined) : Promise<boolean> {
        return this.asyncProcessing(requestInfo, inputData)
    }

    asyncOutputProcessing<_InpTp, _ResTp>( requestInfo : RequestInfo, inputData : _InpTp = undefined, callback : (_ResTp) => void = () => {}) : Promise<boolean> {
        return this.asyncProcessing(requestInfo, undefined, callback)
    }

    private setFetchOption<_InpTp>( requestInfo : RequestInfo, inputData : _InpTp) : RequestInit {
        if( requestInfo.method == HTTP_METHOD.GET || inputData == undefined )
            return { method : requestInfo.method }
        else
            return { method : requestInfo.method, body : JSON.stringify(inputData) }
    }

}